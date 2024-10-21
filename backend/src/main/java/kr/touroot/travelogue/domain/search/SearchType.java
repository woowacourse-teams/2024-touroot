package kr.touroot.travelogue.domain.search;

import java.util.Arrays;

public enum SearchType {
    TITLE, AUTHOR, COUNTRY;

    public static SearchType from(String searchType) {
        return Arrays.stream(SearchType.values())
                .filter(type -> searchType.equalsIgnoreCase(type.name()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 검색 키워드 종류입니다."));
    }
}
