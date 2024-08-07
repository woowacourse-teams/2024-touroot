import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelPlan from "@queries/useDeleteTravelPlan";
import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import { Dropdown, IconButton, Tab, Text, TransformBottomSheet } from "@components/common";
import ShareModal from "@components/pages/travelPlanDetail/ShareModal/ShareModal";
import TravelPlansTabContent from "@components/pages/travelPlanDetail/TravelPlansTabContent/TravelPlansTabContent";

import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractId } from "@utils/extractId";

import theme from "@styles/theme";

import TravelPlanDeleteModal from "./TravelPlanDeleteModal/TravelPlanDeleteModal";
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
  const { mutate: deleteTravelPlan } = useDeleteTravelPlan();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleMoreDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleToggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const handleClickDeleteButton = () => {
    deleteTravelPlan(Number(id));
  };

  //TODO: 수정 이벤트 추가해야함
  const handleClickReviseButton = () => {};

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleToggleShareModal = () => setIsShareModalOpen((prev) => !prev);

  const shareUrl = `${window.location.origin}${ROUTE_PATHS_MAP.travelPlan(data?.data.shareKey ?? "")}`;

  return (
    <>
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onToggleModal={handleToggleShareModal}
          shareUrl={shareUrl}
        />
      )}
      <S.TitleContainer>
        <Text textType="title" css={S.titleStyle}>
          {data?.data?.title}
        </Text>
        <S.IconButtonContainer>
          <IconButton size="16" iconType="share" onClick={handleToggleShareModal} />
          <IconButton
            iconType="more"
            size="16"
            color={theme.colors.text.secondary}
            onClick={handleToggleMoreDropdown}
          />
          <Dropdown isOpen={isDropdownOpen} size="small" position="right">
            <Text textType="detail" onClick={handleClickReviseButton} css={S.cursorPointerStyle}>
              수정
            </Text>
            <Text textType="detail" onClick={handleToggleDeleteModal} css={S.cursorPointerStyle}>
              삭제
            </Text>
          </Dropdown>
        </S.IconButtonContainer>
      </S.TitleContainer>

      <Text textType="subTitle" css={S.summaryTitleStyle}>
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
      {isDeleteModalOpen && (
        <TravelPlanDeleteModal
          isOpen={isDeleteModalOpen}
          onCloseModal={handleToggleDeleteModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelPlanDetailPage;