package woowacourse.touroot.travelogue.domain.place.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record TravelogueLocationResponse(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        @NotBlank(message = "여행기 장소 위도는 비어있을 수 없습니다.")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        @NotBlank(message = "여행기 장소 경도는 비어있을 수 없습니다.")
        String lng
) {
}
