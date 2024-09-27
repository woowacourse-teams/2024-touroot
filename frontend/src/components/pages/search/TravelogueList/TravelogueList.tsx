import { css } from "@emotion/react";

import type { SearchType } from "@type/domain/travelogue";

import useInfiniteSearchTravelogues from "@queries/useInfiniteSearchTravelogues";

import { SearchFallback, Text } from "@components/common";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";
import TravelogueCardSkeleton from "@components/pages/main/TravelogueCard/skeleton/TravelogueCardSkeleton";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import * as S from "./TravelogueList.styled";

const SKELETON_COUNT = 5;

interface TravelogueListProps {
  keyword: string;
  searchType: SearchType;
}

const TravelogueList = ({ keyword, searchType }: TravelogueListProps) => {
  const { travelogues, status, fetchNextPage, isPaused, error } = useInfiniteSearchTravelogues(
    keyword,
    searchType,
  );
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  if (travelogues.length === 0 && status === "success") {
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
  }

  if (status === "error") {
    error && alert(error.message);

    return <SearchFallback title="휑" text="검색 결과가 없어요." />;
  }

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return (
    <S.Layout>
      {keyword && (
        <Text css={S.searchResultTextStyle} textType="title">{`"${keyword}" 검색 결과`}</Text>
      )}
      <S.MainPageTraveloguesList>
        {status === "pending" && (
          <S.MainPageTraveloguesList>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <TravelogueCardSkeleton key={index} />
            ))}
          </S.MainPageTraveloguesList>
        )}
        {travelogues.map(
          ({ id, title, thumbnail, authorProfileUrl, likeCount, tags, authorNickname }) => (
            <TravelogueCard
              key={id}
              travelogueOverview={{
                id,
                title,
                thumbnail,
                authorProfileUrl,
                likeCount,
                tags,
                authorNickname,
              }}
            />
          ),
        )}
        <div
          ref={lastElementRef}
          css={css`
            height: 1px;
          `}
        />
      </S.MainPageTraveloguesList>
    </S.Layout>
  );
};

export default TravelogueList;
