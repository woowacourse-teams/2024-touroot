package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;

public record TravelogueDayUpdateRequest(
        @Schema(description = "여행기 일자 ID", example = "1")
        @NotNull(message = "수정하려는 여행기 일자 ID는 비어있을 수 없습니다.")
        Long id,
        @Schema(description = "여행기 장소 목록")
        @NotNull(message = "여행기 장소 목록은 비어있을 수 없습니다.")
        @Size(message = "여행기 장소는 최소 한 곳은 포함되어야 합니다.", min = 1)
        @Valid
        List<TraveloguePlaceUpdateRequest> places
) {

    public TravelogueDay toTravelogueDay(int order, Travelogue travelogue) {
        return new TravelogueDay(id, order, travelogue);
    }
}
