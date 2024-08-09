package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;

public record TravelogueDayRequest(
        @Schema(description = "여행기 장소 목록")
        @NotNull(message = "여행기 장소 목록은 비어있을 수 없습니다.")
        @Size(message = "여행기 장소는 최소 한 곳은 포함되어야 합니다.", min = 1)
        @Valid
        List<TraveloguePlaceRequest> places
) {

    public TravelogueDay toTravelogueDay(int order, Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }
}
