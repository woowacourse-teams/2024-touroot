package woowacourse.touroot.travelogue.domain.place.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record TravelogueLocationResponse(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        String lng
) {
}
