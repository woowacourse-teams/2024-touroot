package woowacourse.touroot.travelplan.dto.response;

import lombok.Builder;
import woowacourse.touroot.place.domain.Place;

@Builder
public record TravelPlanLocationResponse(String lat, String lng) {

    public static TravelPlanLocationResponse from(Place place) {
        return TravelPlanLocationResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }
}
