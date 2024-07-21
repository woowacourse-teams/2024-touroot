package woowacourse.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import woowacourse.touroot.travelogue.domain.Travelogue;

public record TravelogueRequest(
        @Schema(description = "여행기 제목", example = "서울 강남 여행기")
        @NotNull(message = "여행기 제목은 비어있을 수 없습니다.")
        String title,
        @Schema(description = "여행기 섬네일", example = "https://thumbnail.png")
        @NotNull(message = "여행기 섬네일은 비어있을 수 없습니다.")
        String thumbnail,
        @Schema(description = "여행기 일자 목록")
        @NotNull(message = "여행기 일자 목록은 비어있을 수 없습니다.")
        @Valid
        List<TravelogueDayRequest> days
) {

    public Travelogue toTravelogue() {
        return new Travelogue(title, thumbnail);
    }
}
