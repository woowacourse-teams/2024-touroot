package woowacourse.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;

public record TravelogueDayRequest(
        @Schema(description = "여행기 장소 목록")
        @NotNull(message = "여행기 장소 목록은 비어있을 수 없습니다.")
        @Valid
        List<TraveloguePlaceRequest> places
) {

    public TravelogueDay toTravelogueDay(int order, Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }
}
