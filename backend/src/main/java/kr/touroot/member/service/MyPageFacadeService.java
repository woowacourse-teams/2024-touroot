package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.MyTravelogueResponse;
import kr.touroot.member.dto.ProfileResponse;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.service.TravelogueService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.response.TravelPlanResponse;
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

    @Transactional(readOnly = true)
    public ProfileResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getById(memberAuth.memberId());
        return ProfileResponse.from(member);
    }

    @Transactional(readOnly = true)
    public Page<MyTravelogueResponse> readTravelogues(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<Travelogue> travelogues = travelogueService.findAllByMember(member, pageable);

        return travelogues.map(MyTravelogueResponse::from);
    }

    @Transactional(readOnly = true)
    public Page<TravelPlanResponse> readTravelPlans(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<TravelPlan> travelPlans = travelPlanService.getAllByAuthor(member, pageable);

        return travelPlans.map((travelPlanService::getTravelPlanResponse));
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileUpdateRequest request, MemberAuth memberAuth) {
        return memberService.updateProfile(request, memberAuth);
    }
}
