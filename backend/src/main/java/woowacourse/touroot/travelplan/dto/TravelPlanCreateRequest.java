package woowacourse.touroot.travelplan.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelplan.domain.TravelPlan;

import java.time.LocalDate;
import java.util.List;

public record TravelPlanCreateRequest(
        @NotBlank(message = "여행 계획 제목은 비어있을 수 없습니다.") String title,
        @NotNull(message = "시작일은 비어있을 수 없습니다.") LocalDate startDate,
        @NotNull(message = "여행 날짜 정보는 비어있을 수 없습니다.") List<PlanDayCreateRequest> days
) {

    public TravelPlan toTravelPlan() {
        return new TravelPlan(title, startDate);
    }
}
