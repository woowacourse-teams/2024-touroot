package kr.touroot.travelogue.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TravelogueSearchRequest(
        @NotBlank(message = "검색어는 2글자 이상이어야 합니다.")
        @Size(min = 2, message = "검색어는 2글자 이상이어야 합니다.")
        String keyword
) {
}
