package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.member.dto.response.MyLikeTravelogueResponse;
import kr.touroot.member.dto.response.MyTravelogueResponse;
import kr.touroot.member.dto.response.ProfileResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.service.TravelogueLikeService;
import kr.touroot.travelogue.service.TravelogueService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.response.PlanResponse;
import kr.touroot.travelplan.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MyPageFacadeService {

    private final MemberService memberService;
    private final TravelogueService travelogueService;
    private final TravelPlanService travelPlanService;
    private final TravelogueLikeService travelogueLikeService;

    @Transactional(readOnly = true)
    public ProfileResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getMemberById(memberAuth.memberId());
        return ProfileResponse.from(member);
    }

    @Transactional(readOnly = true)
    public Page<MyTravelogueResponse> readTravelogues(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getMemberById(memberAuth.memberId());
        Page<Travelogue> travelogues = travelogueService.findAllByMember(member, pageable);

        return travelogues.map(MyTravelogueResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<PlanResponse> readTravelPlans(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getMemberById(memberAuth.memberId());
        Page<TravelPlan> travelPlans = travelPlanService.getAllByAuthor(member, pageable);

        return travelPlans.map(PlanResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<MyLikeTravelogueResponse> readLikes(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getMemberById(memberAuth.memberId());

        return travelogueLikeService.findByLiker(member, pageable)
                .map(TravelogueLike::getTravelogue)
                .map(MyLikeTravelogueResponse::from);
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileUpdateRequest request, MemberAuth memberAuth) {
        return memberService.updateProfile(request, memberAuth);
    }
}
