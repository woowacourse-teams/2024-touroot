package woowacourse.touroot.travelplan.dto.response;

import lombok.Builder;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;

@Builder
public record TravelPlanPlaceResponse(String placeName, TravelPlanLocationResponse location, String description) {

    public static TravelPlanPlaceResponse from(TravelPlanPlace planPlace) {
        Place place = planPlace.getPlace();
        TravelPlanLocationResponse locationResponse = TravelPlanLocationResponse.from(place);

        return TravelPlanPlaceResponse.builder()
                .placeName(place.getName())
                .location(locationResponse)
                .description(planPlace.getDescription())
                .build();
    }
}
