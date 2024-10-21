import { SearchFallback, Text } from "@components/common";

import * as S from "./TravelogueList.styled";

interface EmptySearchResultProps {
  keyword: string | undefined;
}

const EmptySearchResult = ({ keyword }: EmptySearchResultProps) => {
  return (
    <S.Layout>
      {keyword && (
        <Text css={S.searchResultTextStyle} textType="title">{`"${keyword}" 검색 결과`}</Text>
      )}
      <S.SearchFallbackWrapper>
        <SearchFallback title="휑" text="검색 결과가 없어요." />
      </S.SearchFallbackWrapper>
    </S.Layout>
  );
};

export default EmptySearchResult;
