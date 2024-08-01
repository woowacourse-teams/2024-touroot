package kr.touroot.member.dto;

import kr.touroot.travelplan.domain.TravelPlan;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record MyTravelPlanResponse(long id, String title, LocalDate startDate, LocalDate endDate) {

    public static MyTravelPlanResponse of(TravelPlan travelPlan, int period) {
        return MyTravelPlanResponse.builder()
                .id(travelPlan.getId())
                .title(travelPlan.getTitle())
                .startDate(travelPlan.getStartDate())
                .endDate(travelPlan.getStartDate().plusDays(period))
                .build();
    }
}
