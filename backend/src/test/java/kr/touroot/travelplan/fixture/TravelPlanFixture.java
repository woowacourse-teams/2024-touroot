package kr.touroot.travelplan.fixture;

import java.time.LocalDate;
import kr.touroot.travelplan.domain.TravelPlan;

public enum TravelPlanFixture {

    TRAVEL_PLAN("제주도 여행 계획", LocalDate.now().plusDays(2));

    private final String title;
    private final LocalDate startDate;

    TravelPlanFixture(String title, LocalDate startDate) {
        this.title = title;
        this.startDate = startDate;
    }

    public TravelPlan get() {
        return new TravelPlan(title, startDate);
    }
}
