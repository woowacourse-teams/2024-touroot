package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import kr.touroot.place.domain.Place;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import lombok.Builder;

@Builder
public record TravelPlanPlaceResponse(
        @Schema(description = "여행 장소 이름", example = "잠실한강공원") String placeName,
        @Schema(description = "여행 장소 위치") TravelPlanPositionResponse position,
        @Schema(description = "여행 장소 설명", example = "신나는 여행 장소") String description,
        @Schema(description = "여행 장소 TODO") List<PlaceTodoResponse> todos
) {

    public static TravelPlanPlaceResponse of(TravelPlanPlace planPlace, List<PlaceTodoResponse> todos) {
        Place place = planPlace.getPlace();
        TravelPlanPositionResponse locationResponse = TravelPlanPositionResponse.from(place);

        return TravelPlanPlaceResponse.builder()
                .placeName(place.getName())
                .position(locationResponse)
                .todos(todos)
                .description(planPlace.getDescription())
                .build();
    }
}
