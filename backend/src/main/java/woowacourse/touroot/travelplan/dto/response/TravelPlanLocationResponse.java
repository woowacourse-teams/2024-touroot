package woowacourse.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import woowacourse.touroot.place.domain.Place;

@Builder
public record TravelPlanLocationResponse(
        @Schema(description = "여행 장소 위도") String lat,
        @Schema(description = "여행 계획 경도") String lng
) {

    public static TravelPlanLocationResponse from(Place place) {
        return TravelPlanLocationResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
