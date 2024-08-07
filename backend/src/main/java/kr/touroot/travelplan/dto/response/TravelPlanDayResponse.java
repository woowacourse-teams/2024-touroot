package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlanDay;
import lombok.Builder;

@Builder
public record TravelPlanDayResponse(
        @Schema(description = "여행 날짜 Id") Long id,
        @Schema(description = "여행 일자") LocalDate date,
        @Schema(description = "여행 장소별 정보") List<TravelPlanPlaceResponse> places
) {

    public static TravelPlanDayResponse of(
            TravelPlanDay planDay,
            List<TravelPlanPlaceResponse> places
    ) {
        return TravelPlanDayResponse.builder()
                .id(planDay.getId())
                .date(planDay.getCurrentDate())
                .places(places)
                .build();
    }
}
