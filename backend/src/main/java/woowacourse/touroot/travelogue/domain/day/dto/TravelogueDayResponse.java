package woowacourse.touroot.travelogue.domain.day.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;

@Builder
public record TravelogueDayResponse(
        @Schema(description = "여행기 일자 ID", example = "1")
        @NotNull(message = "ID는 비어있을 수 없습니다.")
        Long id,
        @Schema(description = "여행기 장소 목록")
        @NotNull(message = "여행기 장소 정보는 비어있을 수 없습니다.")
        List<TraveloguePlaceResponse> places
) {
}
