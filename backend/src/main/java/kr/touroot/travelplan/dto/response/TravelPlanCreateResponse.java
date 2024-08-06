package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TravelPlanCreateResponse(
        @Schema(description = "생성된 여행 계획 id", example = "1")
        Long id
) {
}
