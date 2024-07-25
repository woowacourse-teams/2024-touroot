package woowacourse.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record TraveloguePositionRequest(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        @NotNull(message = "여행기 장소 위도는 비어있을 수 없습니다.")
        String lat,
        @Schema(description = "여행기 장소 경도", example = "127.0867236")
        @NotNull(message = "여행기 장소 경도는 비어있을 수 없습니다.")
        String lng
) {
}
