package woowacourse.touroot.travelplan.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;

public record PlanPlaceRequest(
        @NotBlank(message = "장소명은 비어있을 수 없습니다.") String placeName,
        String description,
        @NotNull
        @Min(value = 0, message = "순서는 1 이상이어야 합니다.")
        int order,
        PlanLocationCreateRequest location
) {

    public TravelPlanPlace toPlanPlace(TravelPlanDay day, Place place) {
        return new TravelPlanPlace(description, order, day, place);
    }
}
