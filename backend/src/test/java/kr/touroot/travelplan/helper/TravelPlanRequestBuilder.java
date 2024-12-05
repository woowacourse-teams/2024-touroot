package kr.touroot.travelplan.helper;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import kr.touroot.travelplan.fixture.TravelPlanFixture;

public class TravelPlanRequestBuilder {

    private final TravelPlanFixture travelPlanFixture;
    private final List<PlanDayRequest> dayRequests = new ArrayList<>();
    private PlanDayRequestBuilder currentDayBuilder;

    private TravelPlanRequestBuilder(TravelPlanFixture travelPlanFixture) {
        this.travelPlanFixture = travelPlanFixture;
    }

    public static TravelPlanRequestBuilder forTravelPlan(TravelPlanFixture travelPlanFixture) {
        return new TravelPlanRequestBuilder(travelPlanFixture);
    }

    public PlanDayRequestBuilder addDay(TravelPlanDayFixture dayFixture) {
        return new PlanDayRequestBuilder(this, dayFixture);
    }

    void addDayRequest(PlanDayRequest planDayRequest) {
        dayRequests.add(planDayRequest);
    }

    public PlanRequest build() {
        return travelPlanFixture.getCreateRequestWith(dayRequests);
    }
}
