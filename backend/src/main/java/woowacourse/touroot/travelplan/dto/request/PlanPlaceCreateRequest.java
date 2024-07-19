package woowacourse.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
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
        @Schema(description = "여행 장소 순서", example = "1")
        @NotNull
        @Min(value = 0, message = "순서는 1 이상이어야 합니다.")
        int order,
        @NotNull PlanLocationCreateRequest location
) {

    public TravelPlanPlace toPlanPlace(TravelPlanDay day, Place place) {
        return new TravelPlanPlace(description, order, day, place);
    }

    public Place toPlace() {
        return new Place(placeName, location.lat(), location.lng());
    }
}
