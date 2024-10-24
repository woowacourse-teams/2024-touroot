package kr.touroot.travelogue.domain.search;

import kr.touroot.global.exception.BadRequestException;

public enum SearchType {
    TITLE, AUTHOR, COUNTRY;

    public static SearchType from(String searchType) {
        try {
            return SearchType.valueOf(searchType.toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new BadRequestException("존재하지 않는 검색 키워드 종류입니다.");
        }
    }
}
