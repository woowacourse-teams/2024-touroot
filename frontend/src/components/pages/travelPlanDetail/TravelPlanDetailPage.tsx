import { useState } from "react";
import { useLocation } from "react-router-dom";

import { css } from "@emotion/react";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import { IconButton, Tab, Text, TransformBottomSheet } from "@components/common";
import ShareModal from "@components/pages/travelPlanDetail/ShareModal/ShareModal";
import TravelPlansTabContent from "@components/pages/travelPlanDetail/TravelPlansTabContent/TravelPlansTabContent";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractId } from "@utils/extractId";

import theme from "@styles/theme";

import * as S from "./TravelPlanDetailPage.styled";

const TravelPlanDetailPage = () => {
  const location = useLocation();

  const id = extractId(location.pathname);

  const { data } = useGetTravelPlan(id);

  const daysAndNights =
    data?.data.days.length && data?.data.days.length > 1
      ? `${data?.data.days.length - 1}박 ${data?.data.days.length}일`
      : "당일치기";

  const { onTransformTravelDetail } = useTravelTransformDetailContext();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleToggleModal = () => setIsShareModalOpen((prev) => !prev);

  const shareUrl = `${window.location.origin}${ROUTE_PATHS_MAP.travelPlan(data?.data.shareKey ?? "")}`;

  return (
    <>
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onToggleModal={handleToggleModal}
          shareUrl={shareUrl}
        />
      )}
      <S.TitleContainer>
        <Text textType="title">{data?.data?.title}</Text>
        <S.IconContainer>
          <IconButton size="16" iconType="share" onClick={handleToggleModal} />
          <IconButton size="16" iconType="more" color={theme.colors.text.secondary} />
        </S.IconContainer>
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
        onTransform={() => onTransformTravelDetail("/travelogue/register", data?.data)}
        buttonLabel="여행기로 전환"
      >
        여행은 즐겁게 다녀오셨나요?
      </TransformBottomSheet>
    </>
  );
};

export default TravelPlanDetailPage;
