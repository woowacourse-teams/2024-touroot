package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.place.domain.Place;
import lombok.Builder;

@Builder
public record TravelPlanPositionResponse(
        @Schema(description = "여행 장소 위도", example = "37.5175896") String lat,
        @Schema(description = "여행 계획 경도", example = "127.0867236") String lng
) {

    public static TravelPlanPositionResponse from(Place place) {
        return TravelPlanPositionResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
