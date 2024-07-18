package woowacourse.touroot.travelplan.dto.response;

import lombok.Builder;
import woowacourse.touroot.travelplan.domain.TravelPlan;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TravelPlanResponse(String title, LocalDate startDate, List<TravelPlanDayResponse> days) {

    public static TravelPlanResponse of(TravelPlan travelPlan, List<TravelPlanDayResponse> days) {
        return TravelPlanResponse.builder()
                .title(travelPlan.getTitle())
                .startDate(travelPlan.getStartDate())
                .days(days)
                .build();
    }
}
