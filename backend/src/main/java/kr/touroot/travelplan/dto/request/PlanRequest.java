package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import lombok.Builder;

@Builder
public record PlanRequest(
        @Schema(description = "여행 계획 제목", example = "신나는 잠실 한강 여행")
        @NotBlank(message = "여행 계획 제목은 비어있을 수 없습니다.")
        String title,
        @Schema(description = "여행 계획 시작일", example = "2024-11-16")
        @NotNull(message = "시작일은 비어있을 수 없습니다.")
        LocalDate startDate,
        @Schema(description = "여행 날짜 정보")
        @Valid
        @Size(min = 1, message = "여행 날짜는 하루 이상 있어야 합니다.")
        @NotNull(message = "여행 날짜 정보는 비어있을 수 없습니다.")
        List<PlanDayRequest> days
) {

    public TravelPlan toTravelPlan(Member author, UUID shareKey) {
        TravelPlan travelPlan = new TravelPlan(title, startDate, shareKey, author);
        addDays(travelPlan);
        return travelPlan;
    }

    private void addDays(TravelPlan travelPlan) {
        for (int order = 0; order < days.size(); order++) {
            PlanDayRequest planDayRequest = days.get(order);
            TravelPlanDay planDay = planDayRequest.toPlanDay(order, travelPlan);
            travelPlan.addDay(planDay);
        }
    }

    public List<TravelPlanDay> getDays(TravelPlan travelPlan) {
        List<TravelPlanDay> travelPlanDays = new ArrayList<>();
        for (int order = 0; order < days.size(); order++) {
            PlanDayRequest planDayRequest = days.get(order);
            TravelPlanDay planDay = planDayRequest.toPlanDay(order, travelPlan);
            travelPlanDays.add(planDay);
        }

        return travelPlanDays;
    }
}
