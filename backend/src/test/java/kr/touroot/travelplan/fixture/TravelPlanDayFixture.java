package kr.touroot.travelplan.fixture;

import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanDayFixture {

    FIRST_DAY(1),
    SECOND_DAY(2),
    THIRD_DAY(3),
    ;

    private final int order;

    public TravelPlanDay getTravelPlanDayIncludedIn(TravelPlan travelPlan) {
        return new TravelPlanDay(order, travelPlan);
    }
}
