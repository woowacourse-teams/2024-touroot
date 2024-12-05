package kr.touroot.travelplan.helper;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceTodoRequest;
import kr.touroot.travelplan.fixture.TravelPlaceTodoFixture;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import kr.touroot.travelplan.fixture.TravelPlanPlaceFixture;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PlanDayRequestBuilder {
    private final TravelPlanRequestBuilder parentBuilder;
    private final TravelPlanDayFixture dayFixture;
    private final List<PlanPlaceRequest> placeRequests = new ArrayList<>();

    public PlanDayRequestBuilder addPlanPlaceWithTodos(
            TravelPlanPlaceFixture placeFixture,
            List<TravelPlaceTodoFixture> todoFixtures
    ) {
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
