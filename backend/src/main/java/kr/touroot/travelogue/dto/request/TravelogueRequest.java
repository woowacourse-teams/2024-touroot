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
        @Schema(description = "여행기 썸네일", example = "S3 이미지 URL")
        @NotNull(message = "여행기 썸네일은 비어있을 수 없습니다.")
        String thumbnail,
        @Schema(description = "선택된 여행기 태그의 id 목록", example = "[1, 2, 3]")
        @NotNull(message = "여행기 태그 필드는 비어있을 수 없습니다.")
        @Size(max = 5, message = "여행기 태그는 최대 5개까지 입력할 수 있습니다.")
        List<Long> tags,
        @Schema(description = "여행기 일자 목록")
        @NotNull(message = "여행기 일자 목록은 비어있을 수 없습니다.")
        @Size(message = "여행기 일자는 최소 1일은 포함되어야 합니다.", min = 1)
        @Valid
        List<TravelogueDayRequest> days
) {

    public Travelogue toTravelogueOf(Member author, String url) {
        return new Travelogue(author, title, url);
    }
}
