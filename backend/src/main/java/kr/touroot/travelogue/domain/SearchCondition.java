package kr.touroot.travelogue.domain;

import lombok.Getter;

@Getter
public class SearchCondition {

    private final String keyword;
    private final SearchType searchType;

    private SearchCondition(String keyword, SearchType searchType) {
        this.keyword = keyword;
        this.searchType = searchType;
    }

    public static SearchCondition of(String keyword, SearchType searchType) {
        return new SearchCondition(keyword, searchType);
    }
}
