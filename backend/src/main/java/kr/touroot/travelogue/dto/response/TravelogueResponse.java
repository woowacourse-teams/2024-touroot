package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record TravelogueResponse(
        @Schema(description = "여행기 ID", example = "1")
        Long id,
        @Schema(description = "여행기 제목", example = "서울 강남 여행기")
        String title,
        @Schema(description = "작성자 닉네임", example = "지니")
        String authorNickname,
        @Schema(description = "여행기 썸네일 링크", example = "https://썸네일.png")
        String thumbnail,
        @Schema(description = "작성 날짜")
        LocalDate createdAt,
        @Schema(description = "여행기 일자 목록")
        List<TravelogueDayResponse> days
) {

    public static TravelogueResponse of(Travelogue travelogue, List<TravelogueDayResponse> days) {
        return TravelogueResponse.builder()
                .id(travelogue.getId())
                .createdAt(travelogue.getCreatedAt().toLocalDate())
                .authorNickname(travelogue.getAuthorNickname())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .days(days)
                .build();
    }
}
