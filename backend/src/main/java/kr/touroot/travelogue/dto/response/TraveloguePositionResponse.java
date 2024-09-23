package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.coordinate.domain.GeographicalCoordinate;
import lombok.Builder;

@Builder
public record TraveloguePositionResponse(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        String lng
) {

    public static TraveloguePositionResponse from(GeographicalCoordinate coordinate) {
        return TraveloguePositionResponse.builder()
                .lat(coordinate.getLatitude())
                .lng(coordinate.getLongitude())
                .build();
    }
}
