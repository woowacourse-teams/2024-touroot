package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import kr.touroot.travelplan.domain.TravelPlanDay;
import lombok.Builder;

@Builder
public record PlanDayResponse(
        @Schema(description = "여행 날짜 Id") Long id,
        @Schema(description = "여행 일자") LocalDate date,
        @Schema(description = "여행 장소별 정보") List<PlanPlaceResponse> places
) {

    public static PlanDayResponse of(
            TravelPlanDay planDay,
            List<PlanPlaceResponse> places
    ) {
        return PlanDayResponse.builder()
                .id(planDay.getId())
                .date(planDay.getCurrentDate())
                .places(places)
                .build();
    }
}
