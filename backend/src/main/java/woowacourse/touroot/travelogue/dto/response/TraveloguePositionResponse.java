package woowacourse.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

@Builder
public record TraveloguePositionResponse(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        String lng
) {

    public static TraveloguePositionResponse from(TraveloguePlace place) {
        return TraveloguePositionResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
