package woowacourse.touroot.travelogue.domain.day.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;

@Builder
public record TravelogueDayResponse(
        @Schema(description = "여행기 일자 ID", example = "1")
        Long id,
        @Schema(description = "여행기 장소 목록")
        List<TraveloguePlaceResponse> places
) {
}
