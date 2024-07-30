import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { useTransformDetailContext } from "@contexts/TravelogueProvider";
import { useGetTravelogue } from "@queries/useGetTravelogue";

import { Tab, TransformBottomSheet } from "@components/common";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import useUser from "@hooks/useUser";

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

  const { user } = useUser();

  const { saveTransformDetail } = useTransformDetailContext();

  const navigate = useNavigate();

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
      <TransformBottomSheet
        onTransform={() => {
          if (Object.keys(user ?? {}).length === 0) {
            alert("로그인 후 이용이 가능합니다.");
            navigate("/login");
          } else if (data) {
            saveTransformDetail(data);
            navigate("/travel-plans/register");
          }
        }}
        buttonLabel="여행 계획으로 전환"
      >
        이 여행기를 따라가고 싶으신가요?
      </TransformBottomSheet>
    </>
  );
};

export default TravelogueDetailPage;
