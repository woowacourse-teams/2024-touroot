package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.travelogue.domain.Travelogue;

public record TravelogueCreateResponse(
        @Schema(description = "생성된 여행기 id", example = "1")
        Long id
) {
    public static TravelogueCreateResponse from(Travelogue travelogue) {
        return new TravelogueCreateResponse(travelogue.getId());
    }
}
