package woowacourse.touroot.travelplan.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;

import java.util.List;

public record PlanDayCreateRequest(
        @NotNull(message = "날짜는 비어있을 수 없습니다.")
        @Min(value = 0, message = "날짜는 1 이상이어야 합니다.")
        int day,
        @NotNull(message = "여행 장소 정보는 비어있을 수 없습니다.") List<PlanPlaceRequest> places
) {

    public TravelPlanDay toPlanDay(TravelPlan plan) {
        return new TravelPlanDay(day, plan);
    }
}
