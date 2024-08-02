package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.MyTravelPlanResponse;
import kr.touroot.member.dto.MyTraveloguesResponse;
import kr.touroot.member.dto.ProfileResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.service.TravelogueService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyPageFacadeService {

    private final MemberService memberService;
    private final TravelogueService travelogueService;
    private final TravelPlanService travelPlanService;

    public ProfileResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getById(memberAuth.memberId());
        return ProfileResponse.from(member);
    }

    public Page<MyTraveloguesResponse> readTravelogues(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<Travelogue> travelogues = travelogueService.findAllByMember(member, pageable);

        return travelogues.map(MyTraveloguesResponse::from);
    }

    public Page<MyTravelPlanResponse> readTravelPlans(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<TravelPlan> travelPlans = travelPlanService.getAllByAuthor(member, pageable);

        return travelPlans.map(this::getMyTravelPlanResponse);
    }

    private MyTravelPlanResponse getMyTravelPlanResponse(TravelPlan travelPlan) {
        int period = travelPlanService.calculateTravelPeriod(travelPlan);
        return MyTravelPlanResponse.of(travelPlan, period);
    }
}
