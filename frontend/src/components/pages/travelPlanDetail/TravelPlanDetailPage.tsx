import { useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation, useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelPlan from "@queries/useDeleteTravelPlan";
import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import {
  DeleteModal,
  Dropdown,
  IconButton,
  Tab,
  Text,
  TransformBottomSheet,
} from "@components/common";
import ShareModal from "@components/pages/travelPlanDetail/ShareModal/ShareModal";
import TravelPlanDetailSkeleton from "@components/pages/travelPlanDetail/TravelPlanDetailSkeleton/TravelPlanDetailSkeleton";
import TravelPlansTabContent from "@components/pages/travelPlanDetail/TravelPlansTabContent/TravelPlansTabContent";

import useClickAway from "@hooks/useClickAway";
import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractLastPath } from "@utils/extractId";
import getDateRange from "@utils/getDateRange";
import { isUUID } from "@utils/uuid";

import theme from "@styles/theme";

import * as S from "./TravelPlanDetailPage.styled";

const TravelPlanDetailPage = () => {
  const location = useLocation();
  const id = extractLastPath(location.pathname);

  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const { data, status, error } = useGetTravelPlan(id);

  const navigate = useNavigate();

  const daysAndNights =
    data?.days.length && data?.days.length > 1
      ? `${data?.days.length - 1}박 ${data?.days.length}일`
      : "당일치기";

  const { mutate: mutateDeleteTravelPlan, isPending: isDeletingPending } = useDeleteTravelPlan();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleMoreDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCloseMoreDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleToggleDeleteModal = () => {
    handleCloseMoreDropdown();
    setIsDeleteModalOpen((prev) => !prev);
  };

  const debouncedClickDeleteButton = useLeadingDebounce(
    () => mutateDeleteTravelPlan(Number(id)),
    DEBOUNCED_TIME,
  );

  const handleClickDeleteButton = () => {
    debouncedClickDeleteButton();
  };

  const handleClickEditButton = () => {
    navigate(ROUTE_PATHS_MAP.travelPlanEdit(Number(id)));
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleToggleShareModal = () => setIsShareModalOpen((prev) => !prev);

  const shareUrl = `${window.location.origin}${ROUTE_PATHS_MAP.travelPlan(data?.shareKey ?? "")}`;

  const handleTransform = () => {
    onTransformTravelDetail(ROUTE_PATHS_MAP.travelogueRegister, data);
    ReactGA.event({
      category: "TransformButton",
      action: "Click",
      label: "여행 계획을 여행기로 전환",
    });
  };

  const iconButtonContainerRef = useRef(null);

  useClickAway(iconButtonContainerRef, handleCloseMoreDropdown);

  if (status === "pending" || status === "error") {
    if (status === "error") {
      alert(error.message);
      navigate(ROUTE_PATHS_MAP.root);
    }

    return <TravelPlanDetailSkeleton />;
  }

  return (
    <>
      <S.TravelPlanDetailLayout>
        <S.TitleContainer>
          <Text textType="title" css={S.titleStyle}>
            {data?.title}
          </Text>
          {!isUUID(id) && (
            <S.IconButtonContainer>
              <IconButton size="16" iconType="share" onClick={handleToggleShareModal} />
              <div ref={iconButtonContainerRef}>
                <IconButton
                  iconType="more"
                  size="16"
                  color={theme.colors.text.secondary}
                  onClick={handleToggleMoreDropdown}
                />
                {isDropdownOpen && (
                  <Dropdown size="small" position="right">
                    <Text
                      textType="detail"
                      onClick={handleClickEditButton}
                      css={S.cursorPointerStyle}
                    >
                      수정
                    </Text>
                    <Text
                      textType="detail"
                      onClick={handleToggleDeleteModal}
                      css={S.cursorPointerStyle}
                    >
                      삭제
                    </Text>
                  </Dropdown>
                )}
              </div>
            </S.IconButtonContainer>
          )}
        </S.TitleContainer>

        <S.TextContainer>
          <Text textType="subTitle">{daysAndNights} 여행 계획 한 눈에 보기</Text>
          <Text textType="detail">
            {getDateRange({ daysLength: data?.days.length, startDate: data?.startDate })}
          </Text>
        </S.TextContainer>

        <Tab
          labels={data?.days.map((_, index: number) => `Day ${index + 1}`) ?? []}
          tabContent={(selectedIndex) => (
            <TravelPlansTabContent places={data?.days[selectedIndex]?.places ?? []} />
          )}
        />
      </S.TravelPlanDetailLayout>

      <TransformBottomSheet
        onTransform={handleTransform}
        buttonLabel="여행기로 전환"
        travelPrompt="여행은 즐겁게 다녀오셨나요?"
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onToggleModal={handleToggleShareModal}
        shareUrl={shareUrl}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        isPending={isDeletingPending}
        mainText="여행 계획을 삭제할까요?"
        subText="삭제한 후에는 여행 계획을 다시 복구할 수 없어요."
        onCloseModal={handleToggleDeleteModal}
        onClickDeleteButton={handleClickDeleteButton}
      />
    </>
  );
};

export default TravelPlanDetailPage;
