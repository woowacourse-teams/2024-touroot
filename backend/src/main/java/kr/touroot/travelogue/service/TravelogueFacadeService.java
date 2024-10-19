package kr.touroot.travelogue.service;

import java.util.List;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.dto.request.TravelogueFilterRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.dto.response.TravelogueCreateResponse;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueFacadeService {

    private final TravelogueService travelogueService;
    private final TravelogueImagePerpetuationService travelogueImagePerpetuationService;
    private final TravelogueTagService travelogueTagService;
    private final TravelogueLikeService travelogueLikeService;
    private final TravelogueCountryService travelogueCountryService;
    private final MemberService memberService;

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

    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(
            TravelogueFilterRequest filterRequest,
            Pageable pageable
    ) {
        TravelogueFilterCondition filter = filterRequest.toFilterCondition();
        Page<Travelogue> travelogues = travelogueService.findAllByFilter(filter, pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

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

        boolean isLikedFromAccessor = travelogueLikeService.existByTravelogueAndMember(updated, author);
        return TravelogueResponse.of(updated, travelogueTags, isLikedFromAccessor);
    }

    @Transactional
    public void deleteTravelogueById(Long id, MemberAuth member) {
        Member author = memberService.getMemberById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        travelogueTagService.deleteAllByTravelogue(travelogue);
        travelogueLikeService.deleteAllByTravelogue(travelogue);
        travelogueService.delete(travelogue, author);
    }

    @Transactional
    public TravelogueLikeResponse likeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        Member liker = memberService.getMemberById(member.memberId());
        travelogueLikeService.likeTravelogue(travelogue, liker);

        return new TravelogueLikeResponse(true, travelogue.getLikeCount());
    }

    @Transactional
    public TravelogueLikeResponse unlikeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        Member liker = memberService.getMemberById(member.memberId());
        travelogueLikeService.unlikeTravelogue(travelogue, liker);

        return new TravelogueLikeResponse(false, travelogue.getLikeCount());
    }
}
