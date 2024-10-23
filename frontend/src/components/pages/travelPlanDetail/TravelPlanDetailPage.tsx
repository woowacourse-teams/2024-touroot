import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useNavigate, useParams } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelPlan from "@queries/useDeleteTravelPlan";
import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import { DeleteModal, Dropdown, IconButton, Tab, Text, TransformFooter } from "@components/common";
import VisuallyHidden from "@components/common/VisuallyHidden/VisuallyHidden";
import ShareModal from "@components/pages/travelPlanDetail/ShareModal/ShareModal";
import TravelPlanDetailSkeleton from "@components/pages/travelPlanDetail/TravelPlanDetailSkeleton/TravelPlanDetailSkeleton";
import TravelPlansTabContent from "@components/pages/travelPlanDetail/TravelPlansTabContent/TravelPlansTabContent";

import useClickAway from "@hooks/useClickAway";
import useLeadingDebounce from "@hooks/useLeadingDebounce";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ROUTE_PATHS_MAP } from "@constants/route";

import getDateRange from "@utils/getDateRange";
import getDaysAndNights from "@utils/getDaysAndNights";
import { isUUID } from "@utils/uuid";

import theme from "@styles/theme";

import * as S from "./TravelPlanDetailPage.styled";

const TravelPlanDetailPage = () => {
  const { id = "" } = useParams();

  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const { data, status, error } = useGetTravelPlan(id);

  const navigate = useNavigate();

  const daysAndNights = getDaysAndNights(data?.days);

  const { mutate: mutateDeleteTravelPlan, isPending: isDeletingPending } = useDeleteTravelPlan();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteModalAnnouncement, setDeleteModalAnnouncement] = useState("");

  const handleToggleMoreDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCloseMoreDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOpenDeleteModal = () => {
    handleCloseMoreDropdown();
    setIsDeleteModalOpen(true);
    setDeleteModalAnnouncement("삭제 메뉴가 열렸습니다.");
  };

  const handleCloseDeleteModal = () => {
    handleCloseMoreDropdown();
    setIsDeleteModalOpen(false);
    setDeleteModalAnnouncement("삭제 메뉴가 닫혔습니다.");
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
  const [shareModalAnnouncement, setShareModalAnnouncement] = useState("");

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
    setShareModalAnnouncement("공유하기 메뉴가 열렸습니다.");
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setShareModalAnnouncement("공유하기 메뉴가 닫혔습니다.");
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <IconButton
                size="16"
                iconType="share"
                onClick={handleOpenShareModal}
                aria-label="공유하기 버튼, 해당 버튼을 클릭하면 공유하기 메뉴가 열립니다."
              />
              <div ref={iconButtonContainerRef}>
                <IconButton
                  iconType="more"
                  size="16"
                  color={theme.colors.text.secondary}
                  onClick={handleToggleMoreDropdown}
                  aria-label="더보기 버튼, 해당 버튼을 클릭하면 수정 및 삭제 메뉴가 열립니다."
                />
                {isDropdownOpen && (
                  <Dropdown size="small" position="right">
                    <S.DropdownButton
                      onClick={handleClickEditButton}
                      aria-label="클릭하면 수정 페이지로 이동합니다."
                    >
                      <Text textType="detail">수정</Text>
                    </S.DropdownButton>
                    <S.DropdownButton
                      onClick={handleOpenDeleteModal}
                      aria-label="클릭하면 삭제 메뉴가 열립니다."
                    >
                      <Text textType="detail">삭제</Text>
                    </S.DropdownButton>
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

      <TransformFooter
        onTransform={handleTransform}
        buttonLabel="여행기로 남기기"
        guideMessage="여행은 즐겁게 다녀오셨나요?"
      />

      <VisuallyHidden aria-live="assertive">{shareModalAnnouncement}</VisuallyHidden>
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onToggleModal={handleCloseShareModal}
          shareUrl={shareUrl}
        />
      )}

      <VisuallyHidden aria-live="assertive">{deleteModalAnnouncement}</VisuallyHidden>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          isPending={isDeletingPending}
          travelContent="travelPlan"
          onCloseModal={handleCloseDeleteModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelPlanDetailPage;
