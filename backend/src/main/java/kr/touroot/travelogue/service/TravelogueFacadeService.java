package kr.touroot.travelogue.service;

import java.util.List;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.dto.request.TravelogueFilterRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.dto.response.TravelogueCreateResponse;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueFacadeService {

    public static final int MAX_CACHING_PAGE = 4;
    public static final String TRAVELOGUE_PAGE_CACHE_NAME = "traveloguePage";

    private final TravelogueService travelogueService;
    private final TravelogueImagePerpetuationService travelogueImagePerpetuationService;
    private final TravelogueTagService travelogueTagService;
    private final TravelogueLikeService travelogueLikeService;
    private final TravelogueCountryService travelogueCountryService;
    private final MemberService memberService;
    private final CacheManager cacheManager;

    @Transactional
    public TravelogueCreateResponse createTravelogue(MemberAuth member, TravelogueRequest request) {
        Member author = memberService.getMemberById(member.memberId());
        Travelogue travelogue = travelogueService.save(request.toTravelogue(author));
        travelogueImagePerpetuationService.copyTravelogueImagesToPermanentStorage(travelogue);
        travelogueTagService.createTravelogueTags(travelogue, request.tags());
        travelogueCountryService.createTravelogueCountries(travelogue, request);

        return TravelogueCreateResponse.from(travelogue);
    }

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueByIdForGuest(Long id) {
        Travelogue travelogue = travelogueService.getTravelogueById(id);
        List<TravelogueTag> travelogueTags = travelogueTagService.readTagByTravelogue(travelogue);

        return TravelogueResponse.createResponseForGuest(travelogue, travelogueTags);
    }

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueByIdForAuthenticated(Long id, MemberAuth member) {
        Member accessor = memberService.getMemberById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);
        List<TravelogueTag> travelogueTags = travelogueTagService.readTagByTravelogue(travelogue);
        boolean likeFromAccessor = travelogueLikeService.existByTravelogueAndMember(travelogue, accessor);

        return TravelogueResponse.of(travelogue, travelogueTags, likeFromAccessor);
    }

    @Cacheable(
            cacheNames = TRAVELOGUE_PAGE_CACHE_NAME,
            key = "#pageable",
            condition = "#pageable.pageNumber <= " + MAX_CACHING_PAGE + " && " +
                    "#filterRequest.toFilterCondition().emptyCondition && " +
                    "#searchRequest.toSearchCondition().emptyCondition && " +
                    "#pageable.sort.toString() == 'likeCount: DESC'"
    )
    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(
            TravelogueFilterRequest filterRequest,
            TravelogueSearchRequest searchRequest,
            Pageable pageable
    ) {
        TravelogueFilterCondition filter = filterRequest.toFilterCondition();
        SearchCondition searchCondition = searchRequest.toSearchCondition();

        Page<Travelogue> travelogues = travelogueService.findAll(searchCondition, filter, pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    // TODO: 프론트엔드 엔드포인트 이전 작업 완료 후 제거
    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(TravelogueSearchRequest request, Pageable pageable) {
        Page<Travelogue> travelogues = travelogueService.findByKeyword(request, pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    private TravelogueSimpleResponse getTravelogueSimpleResponse(Travelogue travelogue) {
        List<TravelogueTag> travelogueTags = travelogueTagService.readTagByTravelogue(travelogue);

        return TravelogueSimpleResponse.of(travelogue, travelogueTags);
    }

    @Transactional
    public TravelogueResponse updateTravelogue(Long id, MemberAuth member, TravelogueRequest updateRequest) {
        Member author = memberService.getMemberById(member.memberId());

        Travelogue updated = travelogueService.update(id, author, updateRequest);
        travelogueImagePerpetuationService.copyTravelogueImagesToPermanentStorage(updated);
        List<TravelogueTag> travelogueTags = travelogueTagService.updateTravelogueTag(updated, updateRequest.tags());
        travelogueCountryService.updateTravelogueCountries(updated, updateRequest);

        boolean isLikedFromAccessor = travelogueLikeService.existByTravelogueAndMember(updated, author);
        return TravelogueResponse.of(updated, travelogueTags, isLikedFromAccessor);
    }

    @Transactional
    public void deleteTravelogueById(Long id, MemberAuth member) {
        Member author = memberService.getMemberById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        processTraveloguePageCache(travelogue);
        travelogueTagService.deleteAllByTravelogue(travelogue);
        travelogueLikeService.deleteAllByTravelogue(travelogue);
        travelogueCountryService.deleteAllByTravelogue(travelogue);
        travelogueService.delete(travelogue, author);
    }

    @Transactional
    public TravelogueLikeResponse likeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        Member liker = memberService.getMemberById(member.memberId());
        travelogueLikeService.likeTravelogue(travelogue, liker);
        processTraveloguePageCache(travelogue);

        return new TravelogueLikeResponse(true, travelogue.getLikeCount());
    }

    @Transactional
    public TravelogueLikeResponse unlikeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        processTraveloguePageCache(travelogue);
        Member liker = memberService.getMemberById(member.memberId());
        travelogueLikeService.unlikeTravelogue(travelogue, liker);

        return new TravelogueLikeResponse(false, travelogue.getLikeCount());
    }

    private void processTraveloguePageCache(Travelogue travelogue) {
        long minimumLikeCountForCacheEviction = travelogueLikeService.getMinimumLikeCountForCacheEviction();
        if (travelogue.isLikeCountBiggerThan(minimumLikeCountForCacheEviction)) {
            invalidateTraveloguePageCache();
        }
    }

    private void invalidateTraveloguePageCache() {
        Cache cache = cacheManager.getCache(TRAVELOGUE_PAGE_CACHE_NAME);
        if (cache != null) {
            cache.clear();
        }
    }
}
