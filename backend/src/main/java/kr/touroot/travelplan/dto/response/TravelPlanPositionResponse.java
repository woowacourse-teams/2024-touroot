package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.place.domain.Place;
import lombok.Builder;

@Builder
public record TravelPlanPositionResponse(
        @Schema(description = "여행 장소 위도") String lat,
        @Schema(description = "여행 계획 경도") String lng
) {

    public static TravelPlanPositionResponse from(Place place) {
        return TravelPlanPositionResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
