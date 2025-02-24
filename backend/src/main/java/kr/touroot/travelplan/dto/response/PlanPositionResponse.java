package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.position.domain.Position;
import lombok.Builder;

@Builder
public record PlanPositionResponse(
        @Schema(description = "여행 획 장소 상세 Id", example = "1") Long id,
        @Schema(description = "여행 장소 위도", example = "37.5175896") String lat,
        @Schema(description = "여행 계획 경도", example = "127.0867236") String lng
) {

    public static PlanPositionResponse from(Position position) {
        return PlanPositionResponse.builder()
                .lat(position.getLatitude())
                .lng(position.getLongitude())
                .build();
    }
}
