import { css } from "@emotion/react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import FloatingButton from "@components/common/FloatingButton/FloatingButton";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import * as S from "./MainPage.styled";
import TravelogueCardSkeleton from "./TravelogueCard/skeleton/TravelogueCardSkeleton";

const MainPage = () => {
  const SKELETON_COUNT = 5;
  const { travelogues, status, fetchNextPage } = useInfiniteTravelogues();
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  return (
    <S.MainPageContentContainer>
      <FloatingButton />
      <S.MainPageHeaderContainer>
        <h1>지금 뜨고 있는 여행기</h1>
        <p>다른 이들의 여행을 한 번 구경해보세요.</p>
      </S.MainPageHeaderContainer>
      {status === "pending" && (
        <S.MainPageTraveloguesList>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TravelogueCardSkeleton key={index} />
          ))}
        </S.MainPageTraveloguesList>
      )}
      <S.MainPageTraveloguesList>
        {travelogues.map(
          ({ authorProfileUrl, authorNickname, id, title, thumbnail, likeCount }) => (
            <TravelogueCard
              key={id}
              travelogueOverview={{
                authorProfileUrl,
                id,
                title,
                thumbnail,
                likeCount,
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
    </S.MainPageContentContainer>
  );
};

export default MainPage;
