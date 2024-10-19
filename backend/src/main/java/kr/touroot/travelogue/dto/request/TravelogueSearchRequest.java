package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TravelogueSearchRequest(
        @Schema(description = "검색어 (제목, 작성자 닉네임 모두 가능)", example = "서울")
        @NotBlank(message = "검색어는 2글자 이상이어야 합니다.")
        @Size(min = 2, message = "검색어는 2글자 이상이어야 합니다.")
        String keyword,
        @Schema(description = "검색 키워드 종류 (TITLE, AUTHOR, COUNTRY)", example = "TITLE")
        @NotBlank(message = "검색 키워드 종류는 필수입니다.")
        String searchType
) {
}
