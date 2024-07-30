package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import kr.touroot.travelplan.domain.TravelPlanDay;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TravelPlanDayResponse(
        @Schema(description = "여행 일자") LocalDate date,
        @Schema(description = "여행 장소별 정보") List<TravelPlanPlaceResponse> places
) {

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
