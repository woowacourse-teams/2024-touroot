import { useLocation } from "react-router-dom";

import { css } from "@emotion/react";

import { useGetTravelogue } from "@queries/useGetTravelogue";

import { Tab, TransformBottomSheet } from "@components/common";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import { EmptyHeart } from "@assets/svg";

import * as S from "./TravelogueDetailPage.styled";

const TravelogueDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.replace(/[^\d]/g, "");

  const { data } = useGetTravelogue(id);

  const daysAndNights =
    data?.days.length && data?.days.length > 1
      ? `${data?.days.length - 1}박 ${data?.days.length}일`
      : "당일치기";

  return (
    <>
      <S.TitleLayout>
        <Thumbnail imageUrl={data?.thumbnail} />
        <S.TitleContainer>
          <S.Title>{data?.title}</S.Title>
          <S.AuthorDateContainer>
            <S.AuthorDate>작성일자</S.AuthorDate>
            <S.AuthorDate>2024-07-15</S.AuthorDate>
          </S.AuthorDateContainer>
          <S.LikesContainer>
            <EmptyHeart />
            <S.Likes>7</S.Likes>
          </S.LikesContainer>
          <S.Title
            css={css`
              margin: 1.6rem 0 3.2rem;
            `}
          >
            {daysAndNights} 여행 한눈에 보기
          </S.Title>
        </S.TitleContainer>
      </S.TitleLayout>
      <Tab
        labels={data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
        tabContent={(selectedIndex) => (
          <TravelogueTabContent places={data?.days[selectedIndex].places ?? []} />
        )}
      />
      <TransformBottomSheet buttonLabel="여행 계획으로 전환">
        이 여행기를 따라가고 싶으신가요?
      </TransformBottomSheet>
    </>
  );
};

export default TravelogueDetailPage;
