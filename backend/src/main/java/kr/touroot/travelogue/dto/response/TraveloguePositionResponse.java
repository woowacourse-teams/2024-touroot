package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.travelogue.domain.TraveloguePlace;
import lombok.Builder;

@Builder
public record TraveloguePositionResponse(
        @Schema(description = "여행기 장소 상세 ID", example = "1")
        Long id,
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        String lng
) {

    public static TraveloguePositionResponse from(TraveloguePlace place) {
        return TraveloguePositionResponse.builder()
                .id(place.getPlace().getId())
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
