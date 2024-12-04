package kr.touroot.travelplan.fixture;


import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanFixture {

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
}
