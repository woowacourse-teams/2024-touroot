package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import lombok.Builder;

@Builder
public record PlanPlaceResponse(
        @Schema(description = "여행 장소 Id", example = "1") Long id,
        @Schema(description = "여행 장소 이름", example = "잠실한강공원") String placeName,
        @Schema(description = "여행 장소 위치") PlanPositionResponse position,
        @Schema(description = "여행 장소 TODO") List<PlanPlaceTodoResponse> todos
) {

    public static PlanPlaceResponse from(TravelPlanPlace planPlace) {
        return PlanPlaceResponse.builder()
                .id(planPlace.getId())
                .placeName(planPlace.getName())
                .position(PlanPositionResponse.from(planPlace.getPosition()))
                .todos(getTodoResponse(planPlace))
                .build();
    }

    private static List<PlanPlaceTodoResponse> getTodoResponse(TravelPlanPlace planPlace) {
        return planPlace.getTravelPlaceTodos().stream()
                .map(PlanPlaceTodoResponse::from)
                .toList();
    }
}
