import { useLocation, useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { useTransformDetailContext } from "@contexts/TravelogueProvider";
import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import { Tab, Text, TransformBottomSheet } from "@components/common";
import TravelPlansTabContent from "@components/pages/TravelPlansDetail/TravelPlansTabContent/TravelPlansTabContent";

import useUser from "@hooks/useUser";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./TravelPlansDetail.styled";

const TravelPlansDetailPage = () => {
  const { user } = useUser();

  const location = useLocation();

  const id = location.pathname.replace(/[^\d]/g, "");

  const { data } = useGetTravelPlan(id, user?.accessToken ?? "");

  const daysAndNights =
    data?.data.days.length && data?.data.days.length > 1
      ? `${data?.data.days.length - 1}박 ${data?.data.days.length}일`
      : "당일치기";

  const { saveTransformDetail } = useTransformDetailContext();

  const navigate = useNavigate();

  return (
    <>
      <S.TitleContainer>
        <Text textType="title">{data?.data?.title}</Text>
        <S.MeatballWrapper>
          <Text
            textType="title"
            css={css`
              color: ${PRIMITIVE_COLORS.gray[500]};
            `}
          >
            ...
          </Text>
        </S.MeatballWrapper>
      </S.TitleContainer>

      <Text
        textType="subTitle"
        css={css`
          margin: 3.2rem 1.6rem 1.6rem;
        `}
      >
        {daysAndNights} 여행 계획 한 눈에 보기
      </Text>

      <Tab
        labels={data?.data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
        tabContent={(selectedIndex) => (
          <TravelPlansTabContent places={data?.data.days[selectedIndex].places ?? []} />
        )}
      />
      <TransformBottomSheet
        onTransform={() => {
          if (Object.keys(user ?? {}).length === 0) {
            alert("로그인 후 이용이 가능합니다.");
            navigate("/login");
          } else if (data) {
            saveTransformDetail(data?.data ?? []);
            navigate("/travelogue/register");
          }
        }}
        buttonLabel="여행기로 전환"
      >
        여행은 즐겁게 다녀오셨나요?
      </TransformBottomSheet>
    </>
  );
};

export default TravelPlansDetailPage;
