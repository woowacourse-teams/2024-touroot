package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlan;
import lombok.Builder;

@Builder
public record TravelPlanResponse(
        @Schema(description = "여행 계획 id") Long id,
        @Schema(description = "여행 계획 제목") String title,
        @Schema(description = "여행 시작일") LocalDate startDate,
        @Schema(description = "여행 계획 날짜별 정보") List<TravelPlanDayResponse> days
) {

    public static TravelPlanResponse of(TravelPlan travelPlan, List<TravelPlanDayResponse> days) {
        return TravelPlanResponse.builder()
                .id(travelPlan.getId())
                .title(travelPlan.getTitle())
                .startDate(travelPlan.getStartDate())
                .days(days)
                .build();
    }
}
