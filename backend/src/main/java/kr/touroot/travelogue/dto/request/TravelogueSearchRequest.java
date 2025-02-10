package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.domain.search.SearchType;

public record TravelogueSearchRequest(
        @Schema(description = "검색어 (제목, 작성자 닉네임 모두 가능)", example = "서울")
        @Size(min = 2, message = "검색어는 2글자 이상이어야 합니다.")
        String keyword,
        @Schema(description = "검색 키워드 종류 (TITLE, AUTHOR, COUNTRY)", example = "TITLE")
        String searchType
) {

    public SearchCondition toSearchCondition() {
        return new SearchCondition(keyword, getSearchType());
    }

    private SearchType getSearchType() {
        if (this.searchType == null) {
            return null;
        }

        return SearchType.from(this.searchType);
    }
}
