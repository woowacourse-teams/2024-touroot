package kr.touroot.travelogue.service;

import java.util.List;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.dto.request.TravelogueFilterRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
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
    private final TravelogueDayService travelogueDayService;
    private final TraveloguePlaceService traveloguePlaceService;
    private final TraveloguePhotoService traveloguePhotoService;
    private final TravelogueTagService travelogueTagService;
    private final TravelogueLikeService travelogueLikeService;
    private final MemberService memberService;

    @Transactional
    public TravelogueResponse createTravelogue(MemberAuth member, TravelogueRequest request) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = request.toTravelogue(author);
        travelogueService.save(travelogue);

        List<TagResponse> tags = travelogueTagService.createTravelogueTags(travelogue, request.tags());
        return TravelogueResponse.of(travelogue, tags, false);
    }

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueById(Long id) {
        Travelogue travelogue = travelogueService.getTravelogueById(id);
        List<TagResponse> tagResponses = travelogueTagService.readTagByTravelogue(travelogue);
        return TravelogueResponse.of(travelogue, tagResponses, false);
    }

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueById(Long id, MemberAuth member) {
        Member accessor = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        List<TagResponse> tagResponses = travelogueTagService.readTagByTravelogue(travelogue);
        boolean likeFromAccessor = travelogueLikeService.existByTravelogueAndMember(travelogue, accessor);
        return TravelogueResponse.of(travelogue, tagResponses, likeFromAccessor);
    }

    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(
            TravelogueFilterRequest filterRequest,
            Pageable pageable
    ) {
        TravelogueFilterCondition filter = filterRequest.toFilterCondition();
        Page<Travelogue> travelogues = findSimpleTraveloguesByFilter(filter, pageable);
        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    private Page<Travelogue> findSimpleTraveloguesByFilter(TravelogueFilterCondition filter, Pageable pageable) {
        return travelogueService.findAllByFilter(filter, pageable);
    }

    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(TravelogueSearchRequest request, Pageable pageable) {
        Page<Travelogue> travelogues = travelogueService.findByKeyword(request, pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    private TravelogueSimpleResponse getTravelogueSimpleResponse(Travelogue travelogue) {
        List<TagResponse> tagResponses = travelogueTagService.readTagByTravelogue(travelogue);
        return TravelogueSimpleResponse.of(travelogue, tagResponses);
    }

    @Transactional
    public TravelogueResponse updateTravelogue(Long id, MemberAuth member, TravelogueRequest request) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        List<TravelogueDay> travelogueDays = request.getTravelogueDays(travelogue);
        Travelogue updatedTravelogue = travelogueService.update(id, author, request);
        clearTravelogueContents(travelogue);

        List<TagResponse> tags = travelogueTagService.createTravelogueTags(travelogue, request.tags());
        boolean likeFromAuthor = travelogueLikeService.existByTravelogueAndMember(travelogue, author);
        return TravelogueResponse.of(updatedTravelogue, tags, likeFromAuthor);
    }

    private void clearTravelogueContents(Travelogue travelogue) {
        traveloguePhotoService.deleteAllByTravelogue(travelogue);
        traveloguePlaceService.deleteAllByTravelogue(travelogue);
        travelogueDayService.deleteAllByTravelogue(travelogue);
        travelogueTagService.deleteAllByTravelogue(travelogue);
    }

    @Transactional
    public void deleteTravelogueById(Long id, MemberAuth member) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        travelogueTagService.deleteAllByTravelogue(travelogue);
        travelogueLikeService.deleteAllByTravelogue(travelogue);
        travelogueService.delete(travelogue, author);
    }

    @Transactional
    public TravelogueLikeResponse likeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        Member liker = memberService.getById(member.memberId());
        travelogueLikeService.likeTravelogue(travelogue, liker);

        return new TravelogueLikeResponse(true, travelogue.getLikeCount());
    }

    @Transactional
    public TravelogueLikeResponse unlikeTravelogue(Long travelogueId, MemberAuth member) {
        Travelogue travelogue = travelogueService.getTravelogueById(travelogueId);
        Member liker = memberService.getById(member.memberId());
        travelogueLikeService.unlikeTravelogue(travelogue, liker);

        return new TravelogueLikeResponse(false, travelogue.getLikeCount());
    }
}
