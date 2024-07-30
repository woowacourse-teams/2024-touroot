package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import kr.touroot.travelogue.domain.TravelogueDay;
import lombok.Builder;

@Builder
public record TravelogueDayResponse(
        @Schema(description = "여행기 일자 ID", example = "1")
        Long id,
        @Schema(description = "여행기 장소 목록")
        List<TraveloguePlaceResponse> places
) {

    public static TravelogueDayResponse of(TravelogueDay day, List<TraveloguePlaceResponse> places) {
        return TravelogueDayResponse.builder()
                .id(day.getId())
                .places(places)
                .build();
    }
}
