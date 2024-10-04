package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TravelogueCreateResponse(
        @Schema(description = "생성된 여행기 id", example = "1")
        Long id
) {
}
