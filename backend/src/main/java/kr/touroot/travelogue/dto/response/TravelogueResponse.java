package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record TravelogueResponse(
        @Schema(description = "여행기 ID", example = "1")
        @NotNull(message = "ID는 비어있을 수 없습니다.")
        Long id,
        @Schema(description = "여행기 제목", example = "서울 강남 여행기")
        @NotNull(message = "여행기 제목은 비어있을 수 없습니다.")
        String title,
        @Schema(description = "여행기 섬네일 링크", example = "https://섬네일.png")
        @NotNull(message = "여행기 섬네일 링크는 비어있을 수 없습니다.")
        String thumbnail,
        @Schema(description = "여행기 일자 목록")
        @NotNull(message = "여행기 일자 목록은 비어있을 수 없습니다.")
        @Valid
        List<TravelogueDayResponse> days
) {

    public static TravelogueResponse of(Travelogue travelogue, List<TravelogueDayResponse> days) {
        return TravelogueResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .days(days)
                .build();
    }
}
