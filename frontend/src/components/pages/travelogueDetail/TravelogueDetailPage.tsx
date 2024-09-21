import { useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation, useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelogue from "@queries/useDeleteTravelogue";
import useDeleteUpdateHeart from "@queries/useDeleteUpdateHeart";
import { useGetTravelogue } from "@queries/useGetTravelogue";
import usePostUpdateHeart from "@queries/usePostUpdateHeart";

import {
  Chip,
  DeleteModal,
  Dropdown,
  IconButton,
  Tab,
  Text,
  TransformBottomSheet,
} from "@components/common";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueDetailSkeleton from "@components/pages/travelogueDetail/TravelogueDetailSkeleton/TravelogueDetailSkeleton";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import useClickAway from "@hooks/useClickAway";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useUser from "@hooks/useUser";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractID } from "@utils/extractId";

import theme from "@styles/theme";
import { SEMANTIC_COLORS } from "@styles/tokens";

import * as S from "./TravelogueDetailPage.styled";

const TravelogueDetailPage = () => {
  const location = useLocation();
  const id = extractID(location.pathname);

  const { user } = useUser();

  const { data, status, error, isPaused: isGettingTraveloguePaused } = useGetTravelogue(id);

  const isAuthor = data?.authorId === user?.memberId;

  const navigate = useNavigate();

  const daysAndNights =
    data?.days.length && data?.days.length > 1
      ? `${data?.days.length - 1}박 ${data?.days.length}일`
      : "당일치기";

  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const {
    mutate: mutateDeleteTravelogue,
    isPaused: isDeletingTraveloguePaused,
    isPending: isDeletingPending,
  } = useDeleteTravelogue();

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
    () => mutateDeleteTravelogue(Number(id)),
    DEBOUNCED_TIME,
  );

  const handleClickDeleteButton = () => {
    debouncedClickDeleteButton();
  };

  const handleClickEditButton = () => {
    navigate(ROUTE_PATHS_MAP.travelogueEdit(Number(id)));
  };

  const moreContainerRef = useRef(null);

  useClickAway(moreContainerRef, handleCloseMoreDropdown);

  const handleTransform = () => {
    onTransformTravelDetail(ROUTE_PATHS_MAP.travelPlanRegister, data);
    ReactGA.event({
      category: "TransformButton",
      action: "Click",
      label: "여행기를 여행 계획으로 전환",
    });
  };

  const { mutate: handleActiveHeart, isPaused: isPostingHeartPaused } = usePostUpdateHeart();
  const { mutate: handleInactiveHeart, isPaused: isDeletingHeartPaused } = useDeleteUpdateHeart();

  if (
    isGettingTraveloguePaused ||
    isDeletingTraveloguePaused ||
    isPostingHeartPaused ||
    isDeletingHeartPaused
  ) {
    alert(ERROR_MESSAGE_MAP.network);
  }

  if (status === "error" || status === "pending") {
    if (status === "error") {
      alert(error.message);
      navigate(ROUTE_PATHS_MAP.back);
    }

    return <TravelogueDetailSkeleton />;
  }

  return (
    <>
      <S.TravelogueDetailLayout>
        <S.TravelogueDetailHeader>
          <Thumbnail imageUrl={data?.thumbnail} />
          <S.TitleContainer>
            <Text textType="title" css={S.titleStyle}>
              {data?.title}
            </Text>
            <S.AuthorInfoContainer>
              <Text textType="detail" css={S.authorDateStyle}>
                {data?.authorNickname}
              </Text>
              <Text textType="detail" css={S.authorDateStyle}>
                {data?.createdAt}
              </Text>
            </S.AuthorInfoContainer>
          </S.TitleContainer>
          <S.IconButtonContainer>
            <S.LikesContainer>
              {data?.isLiked ? (
                <IconButton
                  onClick={() => handleInactiveHeart(id)}
                  iconType="heart"
                  color={SEMANTIC_COLORS.heart}
                  size="24"
                />
              ) : (
                <IconButton
                  onClick={() => handleActiveHeart(id)}
                  iconType="empty-heart"
                  size="24"
                />
              )}
              <Text textType="detail">{data?.likeCount}</Text>
            </S.LikesContainer>
            {isAuthor && (
              <div ref={moreContainerRef}>
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
            )}
          </S.IconButtonContainer>
        </S.TravelogueDetailHeader>

        <S.TravelogueOverview>
          <Text textType="subTitle">{daysAndNights} 여행 한눈에 보기</Text>
          <S.TravelogueCardChipsContainer>
            {data?.tags.map((tag) => <Chip key={tag.id} label={tag.tag} />)}
          </S.TravelogueCardChipsContainer>
        </S.TravelogueOverview>

        <Tab
          labels={data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
          tabContent={(selectedIndex) => (
            <TravelogueTabContent places={data?.days[selectedIndex]?.places ?? []} />
          )}
        />
      </S.TravelogueDetailLayout>
      {!isAuthor && (
        <TransformBottomSheet onTransform={handleTransform} buttonLabel="여행 계획으로 전환">
          <Text textType="detail" css={S.transformBottomSheetTextStyle}>
            이 여행기를 따라가고 싶으신가요?
          </Text>
        </TransformBottomSheet>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          isPending={isDeletingPending}
          mainText="여행기를 삭제할까요?"
          subText="삭제한 후에는 여행기를 다시 복구할 수 없어요."
          onCloseModal={handleToggleDeleteModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelogueDetailPage;
