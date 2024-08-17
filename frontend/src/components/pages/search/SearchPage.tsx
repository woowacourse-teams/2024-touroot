import { useLocation } from "react-router-dom";

import { css } from "@emotion/react";

import useInfiniteSearchTravelogues from "@queries/useInfiniteSearchTravelogues";

import { Text } from "@components/common";
import FloatingButton from "@components/common/FloatingButton/FloatingButton";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import TravelogueCardSkeleton from "../main/TravelogueCard/skeleton/TravelogueCardSkeleton";
import * as S from "./SearchPage.styled";
import SearchFallback from "./fallback/SearchFallback";

const SearchPage = () => {
  const SKELETON_COUNT = 5;

  const location = useLocation();
  const encodedKeyword =
    location.pathname.split("/").length > 2 ? location.pathname.split("/").pop() : "";
  const keyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : "";
  const { travelogues, status, fetchNextPage } = useInfiniteSearchTravelogues(keyword);
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  if (!keyword) {
    return (
      <SearchFallback title="보고 싶은 여행기를 검색해주세요!" text="여행기 키워드를 입력해봐요!" />
    );
  }

  if (travelogues.length === 0 && status === "success") {
    return <SearchFallback title="휑" text="검색 결과가 없어요." />;
  }

  return (
    <S.Layout>
      <FloatingButton />
      <S.Layout>{keyword && <Text textType="title">{`"${keyword}" 검색 결과`}</Text>}</S.Layout>
      {status === "pending" && (
        <S.MainPageTraveloguesList>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TravelogueCardSkeleton key={index} />
          ))}
        </S.MainPageTraveloguesList>
      )}
      <S.MainPageTraveloguesList>
        {travelogues.map(({ id, title, thumbnail, authorProfileUrl, likes }) => (
          <TravelogueCard
            key={id}
            travelogueOverview={{ id, title, thumbnail, authorProfileUrl, likes }}
          />
        ))}
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