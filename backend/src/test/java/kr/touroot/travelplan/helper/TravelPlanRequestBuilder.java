package kr.touroot.travelplan.helper;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceTodoRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.fixture.TravelPlaceTodoFixture;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import kr.touroot.travelplan.fixture.TravelPlanFixture;
import kr.touroot.travelplan.fixture.TravelPlanPlaceFixture;
import lombok.RequiredArgsConstructor;

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

    @RequiredArgsConstructor
    public static class PlanDayRequestBuilder {
        private final TravelPlanRequestBuilder parentBuilder;
        private final TravelPlanDayFixture dayFixture;
        private final List<PlanPlaceRequest> placeRequests = new ArrayList<>();

        public PlanDayRequestBuilder addPlanPlaceWithTodos(TravelPlanPlaceFixture placeFixture,
                                                           List<TravelPlaceTodoFixture> todoFixtures) {
            List<PlanPlaceTodoRequest> todoCreateRequests = todoFixtures.stream()
                    .map(TravelPlaceTodoFixture::getCreateRequest)
                    .toList();
            PlanPlaceRequest planPlaceCreateRequest = placeFixture.getCreateRequestWith(todoCreateRequests);
            placeRequests.add(planPlaceCreateRequest);
            return this;
        }

        public TravelPlanRequestBuilder buildDay() {
            PlanDayRequest planDayRequest = dayFixture.getCreateRequestWith(placeRequests);
            parentBuilder.addDayRequest(planDayRequest);
            return parentBuilder;
        }
    }
}
