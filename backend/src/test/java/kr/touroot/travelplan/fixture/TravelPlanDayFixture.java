package kr.touroot.travelplan.fixture;

import static kr.touroot.travelplan.fixture.TravelPlanFixture.TRAVEL_PLAN;

import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanDayFixture {

    TRAVEL_PLAN_DAY(0, TRAVEL_PLAN.get());

    private final int order;
    private final TravelPlan travelPlan;

    public TravelPlanDay get() {
        return new TravelPlanDay(order, travelPlan);
    }
}
