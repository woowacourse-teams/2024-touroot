package woowacourse.touroot.travelplan.dto.response;

import lombok.Builder;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TravelPlanDayResponse(LocalDate date, List<TravelPlanPlaceResponse> places) {

    public static TravelPlanDayResponse of(
            TravelPlanDay planDay,
            List<TravelPlanPlaceResponse> places
    ) {
        return TravelPlanDayResponse.builder()
                .date(planDay.getCurrentDate())
                .places(places)
                .build();
    }
}
