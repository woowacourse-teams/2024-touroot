package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;

public record PlanDayCreateRequest(
        @Schema(description = "여행 장소 정보")
        @Valid
        @Size(min = 1, message = "여행 장소는 한 개 이상이어야 합니다.")
        @NotNull(message = "여행 장소 정보는 비어있을 수 없습니다.")
        List<PlanPlaceCreateRequest> places
) {

    public TravelPlanDay toPlanDay(int order, TravelPlan plan) {
        return new TravelPlanDay(order, plan);
    }
}
