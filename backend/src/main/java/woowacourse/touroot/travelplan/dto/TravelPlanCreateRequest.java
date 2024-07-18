package woowacourse.touroot.travelplan.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelplan.domain.TravelPlan;

import java.time.LocalDate;
import java.util.List;

public record TravelPlanCreateRequest(
        @Schema(description = "여행 계획 제목", example = "신나는 잠실 한강 여행")
        @NotBlank(message = "여행 계획 제목은 비어있을 수 없습니다.")
        String title,
        @Schema(description = "여행 계획 시작일", example = "2024-11-16")
        @NotNull(message = "시작일은 비어있을 수 없습니다.")
        LocalDate startDate,
        @Schema(description = "여행 날짜 정보")
        @NotNull(message = "여행 날짜 정보는 비어있을 수 없습니다.")
        List<PlanDayCreateRequest> days
) {

    public TravelPlan toTravelPlan() {
        return new TravelPlan(title, startDate);
    }
}
