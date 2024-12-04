package kr.touroot.travelplan.fixture;


import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanFixture {

    //TODO: 비결정적 함수 정확한 값으로 바꾸기
    JEJU_TRAVEL_PLAN("제주도 여행 계획", LocalDate.now().plusDays(2), UUID.randomUUID());

    private final String title;
    private final LocalDate startDate;
    private final UUID shareKey;

    public TravelPlan getTravelPlanOwnedBy(Member author) {
        return new TravelPlan(title, startDate, shareKey, author);
    }

    public TravelPlan getTravelPlanOwnedBy(Member author, LocalDate startDate) {
        return new TravelPlan(title, startDate, shareKey, author);
    }

    public PlanRequest getCreateRequestWith(List<PlanDayRequest> dayRequests) {
        return new PlanRequest(title, startDate, dayRequests);
    }
}
