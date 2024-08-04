package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.place.domain.Place;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import lombok.Builder;

@Builder
public record TravelPlanPlaceResponse(
        @Schema(description = "여행 장소 이름", example = "잠실한강공원") String placeName,
        @Schema(description = "여행 장소 위치") TravelPlanPositionResponse position,
        @Schema(description = "여행 장소 설명", example = "신나는 여행 장소") String description
) {

    public static TravelPlanPlaceResponse from(TravelPlanPlace planPlace) {
        Place place = planPlace.getPlace();
        TravelPlanPositionResponse locationResponse = TravelPlanPositionResponse.from(place);

        return TravelPlanPlaceResponse.builder()
                .placeName(place.getName())
                .position(locationResponse)
                .description(planPlace.getDescription())
                .build();
    }
}
