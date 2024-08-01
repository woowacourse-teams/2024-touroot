package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;

public record TravelogueRequest(
        @Schema(description = "여행기 제목", example = "서울 강남 여행기")
        @NotBlank(message = "여행기 제목은 비어있을 수 없습니다.")
        @Size(message = "여행기 제목은 20자를 초과할 수 없습니다.", max = 20)
        String title,
        @Schema(description = "여행기 썸네일", example = "https://thumbnail.png")
        @NotNull(message = "여행기 썸네일은 비어있을 수 없습니다.")
        String thumbnail,
        @Schema(description = "여행기 일자 목록")
        @NotNull(message = "여행기 일자 목록은 비어있을 수 없습니다.")
        @Valid
        List<TravelogueDayRequest> days
) {

    public Travelogue toTravelogueOf(Member author, String url) {
        return new Travelogue(author, title, url);
    }
}
