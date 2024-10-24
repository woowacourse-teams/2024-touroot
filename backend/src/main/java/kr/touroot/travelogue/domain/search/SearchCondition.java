package kr.touroot.travelogue.domain.search;

import lombok.Getter;

@Getter
public class SearchCondition {

    private final String keyword;
    private final SearchType searchType;

    public SearchCondition(String keyword, SearchType searchType) {
        this.keyword = keyword;
        this.searchType = searchType;
    }

    public boolean isEmptyCondition() {
        return keyword == null && searchType == null;
    }

    public boolean isNoneCountry() {
        return searchType == SearchType.COUNTRY && CountryCode.findByName(keyword) == CountryCode.NONE;
    }
}
