import { css } from "@emotion/react";

import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import { client } from "@apis/client";

import { Header, Tab, TransformBottomSheet } from "@components/common";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import { EmptyHeart } from "@assets/svg";

import * as S from "./TravelogueDetailPage.styled";

interface Place {
  name: string;
  photoUrls: string[];
  description: string;
  latitude: string;
  longitude: string;
}

interface Day {
  places: Place[];
}

interface Travelogue {
  title: string;
  thumbnail: string;
  days: Day[];
}

const TravelogueDetailPage = () => {
  const { data } = useQuery<AxiosResponse<Travelogue>>({
    queryKey: ["travelogues/1"],
    queryFn: () => client.get("/travelogues/2"),
  });

  const daysAndNights =
    data?.data.days.length && data?.data.days.length > 1
      ? `${data?.data.days.length - 1}박 ${data?.data.days.length}일`
      : "당일치기";

  return (
    <>
      <Header />
      <S.TitleLayout>
        <S.Thumbnail src={data?.data?.thumbnail} />
        <S.TitleContainer>
          <S.Title>{data?.data?.title}</S.Title>
          <S.AuthorDateContainer>
            <S.AuthorDate>작성자</S.AuthorDate>
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
        labels={data?.data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
        tabContent={(selectedIndex) => (
          <TravelogueTabContent places={data?.data.days[selectedIndex].places ?? []} />
        )}
      />
      <TransformBottomSheet>이 여행기를 따라가고 싶으신가요?</TransformBottomSheet>
    </>
  );
};

export default TravelogueDetailPage;
