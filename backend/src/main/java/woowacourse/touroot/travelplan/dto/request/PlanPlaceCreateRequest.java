package woowacourse.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;

@Builder
public record PlanPlaceCreateRequest(
        @Schema(description = "여행 장소 이름", example = "잠실한강공원")
        @NotBlank(message = "장소명은 비어있을 수 없습니다.") String placeName,
        @Schema(description = "여행 장소 설명", example = "신나는 여행 장소")
        String description,
        @Valid
        @NotNull(message = "위치는 비어있을 수 없습니다.")
        PlanLocationCreateRequest location
) {

    public TravelPlanPlace toPlanPlace(int order, TravelPlanDay day, Place place) {
        return new TravelPlanPlace(description, order, day, place);
    }

    public Place toPlace() {
        return new Place(placeName, location.lat(), location.lng());
    }
}
