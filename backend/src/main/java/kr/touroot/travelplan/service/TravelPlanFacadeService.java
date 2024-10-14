package kr.touroot.travelplan.service;

import java.util.UUID;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.dto.response.PlanCreateResponse;
import kr.touroot.travelplan.dto.response.PlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelPlanFacadeService {

    private final MemberService memberService;
    private final TravelPlanService travelPlanService;

    @Transactional
    public PlanCreateResponse createTravelPlan(PlanRequest request, MemberAuth memberAuth) {
        Member author = memberService.getMemberById(memberAuth.memberId());
        TravelPlan travelPlan = request.toTravelPlan(author, UUID.randomUUID());
        TravelPlan savedTravelPlan = travelPlanService.save(travelPlan);

        return PlanCreateResponse.from(savedTravelPlan);
    }

    @Transactional(readOnly = true)
    public PlanResponse findTravelPlanById(Long planId, MemberAuth memberAuth) {
        Member accessor = memberService.getMemberById(memberAuth.memberId());
        TravelPlan travelPlan = travelPlanService.getTravelPlanById(planId, accessor);

        return PlanResponse.from(travelPlan);
    }

    @Transactional(readOnly = true)
    public PlanResponse findTravelPlanByShareKey(UUID shareKey) {
        return PlanResponse.from(travelPlanService.getTravelPlanByShareKey(shareKey));
    }

    @Transactional
    public PlanResponse updateTravelPlanById(Long id, MemberAuth memberAuth, PlanRequest planUpdateRequest) {
        Member accessor = memberService.getMemberById(memberAuth.memberId());
        TravelPlan travelPlan = travelPlanService.getTravelPlanById(id, accessor);
        TravelPlan updated = travelPlanService.updateTravelPlan(travelPlan, accessor, planUpdateRequest);

        return PlanResponse.from(updated);
    }

    @Transactional
    public void deleteTravelPlanById(Long id, MemberAuth memberAuth) {
        Member accessor = memberService.getMemberById(memberAuth.memberId());
        TravelPlan travelPlan = travelPlanService.getTravelPlanById(id, accessor);

        travelPlanService.deleteTravelPlan(travelPlan, accessor);
    }
}
