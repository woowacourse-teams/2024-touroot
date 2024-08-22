import { useLocation } from "react-router-dom";

import { css } from "@emotion/react";

import useInfiniteSearchTravelogues from "@queries/useInfiniteSearchTravelogues";

import { FloatingButton, SearchFallback, Text } from "@components/common";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import { extractLastPath } from "@utils/extractId";

import TravelogueCardSkeleton from "../main/TravelogueCard/skeleton/TravelogueCardSkeleton";
import * as S from "./SearchPage.styled";

const SearchPage = () => {
  const SKELETON_COUNT = 5;

  const location = useLocation();
  const encodedKeyword =
    location.pathname.split("/").length > 2 ? extractLastPath(location.pathname) : "";
  const keyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";

  const { travelogues, status, fetchNextPage, isPaused, error } =
    useInfiniteSearchTravelogues(keyword);

  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  if (!keyword) {
    return (
      <S.Layout>
        <S.SearchFallbackWrapper>
          <SearchFallback
            title="보고 싶은 여행기를 검색해주세요!"
            text="여행기 키워드를 입력해봐요!"
          />
        </S.SearchFallbackWrapper>
      </S.Layout>
    );
  }

  if (travelogues.length === 0 && status === "success") {
    return (
      <S.Layout>
        {keyword && <Text textType="title">{`"${keyword}" 검색 결과`}</Text>}
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
      <FloatingButton />
      {keyword && <Text textType="title">{`"${keyword}" 검색 결과`}</Text>}
      {status === "pending" && (
        <S.MainPageTraveloguesList>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TravelogueCardSkeleton key={index} />
          ))}
        </S.MainPageTraveloguesList>
      )}
      <S.MainPageTraveloguesList>
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
      </S.MainPageTraveloguesList>
      <div
        ref={lastElementRef}
        css={css`
          height: 1px;
        `}
      />
    </S.Layout>
  );
};

export default SearchPage;
