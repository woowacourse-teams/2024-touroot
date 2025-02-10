package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;

public record PlanDayRequest(
        @Schema(description = "여행 장소 정보")
        @Valid
        @Size(min = 1, message = "여행 장소는 한 개 이상이어야 합니다.")
        @NotNull(message = "여행 장소 정보는 비어있을 수 없습니다.")
        List<PlanPlaceRequest> places
) {

    public TravelPlanDay toPlanDay(int order, TravelPlan plan) {
        TravelPlanDay travelPlanDay = new TravelPlanDay(order, plan);
        addPlaces(travelPlanDay);
        return travelPlanDay;
    }

    private void addPlaces(TravelPlanDay travelPlanDay) {
        for (int order = 0; order < places.size(); order++) {
            PlanPlaceRequest planPlaceRequest = places.get(order);
            TravelPlanPlace planPlace = planPlaceRequest.toPlanPlace(order, travelPlanDay);
            travelPlanDay.addPlace(planPlace);
        }
    }
}
