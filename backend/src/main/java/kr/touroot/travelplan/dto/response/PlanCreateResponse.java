package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.travelplan.domain.TravelPlan;

public record PlanCreateResponse(
        @Schema(description = "생성된 여행 계획 id", example = "1")
        Long id
) {

    public static PlanCreateResponse from(TravelPlan travelPlan) {
        return new PlanCreateResponse(travelPlan.getId());
    }
}
