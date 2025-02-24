package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import kr.touroot.travelplan.domain.TravelPlan;
import lombok.Builder;

@Builder
public record PlanResponse(
        @Schema(description = "여행 계획 id", example = "1") Long id,
        @Schema(description = "여행 계획 제목", example = "신나는 잠실 한강 여행") String title,
        @Schema(description = "여행 시작일", example = "2024-11-16") LocalDate startDate,
        @Schema(description = "여행 계획 날짜별 정보") List<PlanDayResponse> days,
        @Schema(description = "여행 계획 공유 share Key") UUID shareKey
) {

    public static PlanResponse from(TravelPlan travelPlan) {
        return PlanResponse.builder()
                .id(travelPlan.getId())
                .title(travelPlan.getTitle())
                .startDate(travelPlan.getStartDate())
                .days(getTravelPlanDaysResponse(travelPlan))
                .shareKey(travelPlan.getShareKey())
                .build();
    }

    private static List<PlanDayResponse> getTravelPlanDaysResponse(TravelPlan travelPlan) {
        return travelPlan.getTravelPlanDays().stream()
                .map(PlanDayResponse::from)
                .toList();
    }
}
