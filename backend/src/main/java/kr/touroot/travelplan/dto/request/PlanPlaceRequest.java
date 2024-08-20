package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import kr.touroot.place.domain.Place;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import lombok.Builder;

@Builder
public record PlanPlaceRequest(
        @Schema(description = "여행 장소 이름", example = "잠실한강공원")
        @NotBlank(message = "장소명은 비어있을 수 없습니다.") String placeName,
        @Valid
        @NotNull(message = "위치는 비어있을 수 없습니다.")
        PlanPositionRequest position,
        @Valid
        @NotNull(message = "TODO 리스트는 필수 입니다.")
        List<PlanPlaceTodoRequest> todos
) {

    public TravelPlanPlace toPlanPlace(int order, TravelPlanDay day, Place place) {
        return new TravelPlanPlace(order, day, place);
    }

    public Place toPlace() {
        return new Place(placeName, position.lat(), position.lng());
    }
}
