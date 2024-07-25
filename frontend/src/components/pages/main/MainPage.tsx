import { css } from "@emotion/react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import * as S from "./MainPage.styled";

const MainPage = () => {
  const { travelogues, status, fetchNextPage } = useInfiniteTravelogues();
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  return (
    <S.MainPageContentContainer>
      <S.MainPageHeaderContainer>
        <h1>지금 뜨고 있는 여행기</h1>
        <p>다른 이들의 여행을 한 번 구경해보세요.</p>
      </S.MainPageHeaderContainer>
      {status === "pending" && <>로딩 ...</>}
      <S.MainPageTraveloguesList>
        {travelogues.map(({ userAvatar, id, title, thumbnail, likes }) => (
          <TravelogueCard travelogueOverview={{ userAvatar, id, title, thumbnail, likes }} />
        ))}
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
