package woowacourse.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;

import java.util.List;

public record PlanDayCreateRequest(
        @Schema(description = "여행 계획 날짜", example = "1")
        @NotNull(message = "날짜는 비어있을 수 없습니다.")
        @Min(value = 0, message = "날짜는 1 이상이어야 합니다.")
        int day,
        @Schema(description = "여행 장소 정보")
        @NotNull(message = "여행 장소 정보는 비어있을 수 없습니다.") List<PlanPlaceCreateRequest> places
) {

    public TravelPlanDay toPlanDay(TravelPlan plan) {
        return new TravelPlanDay(day, plan);
    }
}
