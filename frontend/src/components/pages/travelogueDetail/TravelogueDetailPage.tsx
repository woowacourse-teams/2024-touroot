import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useNavigate, useParams } from "react-router-dom";

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
  TransformFooter,
} from "@components/common";
import VisuallyHidden from "@components/common/VisuallyHidden/VisuallyHidden";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueDetailSkeleton from "@components/pages/travelogueDetail/TravelogueDetailSkeleton/TravelogueDetailSkeleton";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import useClickAway from "@hooks/useClickAway";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useUser from "@hooks/useUser";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import getDaysAndNights from "@utils/getDaysAndNights";
import { removeEmoji } from "@utils/removeEmojis";

import theme from "@styles/theme";
import { SEMANTIC_COLORS } from "@styles/tokens";

import * as S from "./TravelogueDetailPage.styled";

const TravelogueDetailPage = () => {
  const { id = "" } = useParams();

  const { user } = useUser();

  const { data, status, error, isPaused: isGettingTraveloguePaused } = useGetTravelogue(id);

  const isAuthor = data?.authorId === user?.memberId;

  const navigate = useNavigate();

  const daysAndNights = getDaysAndNights(data?.days);
  const OVERVIEW_TEXT = `${daysAndNights} 여행 한눈에 보기`;

  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const {
    mutate: mutateDeleteTravelogue,
    isPaused: isDeletingTraveloguePaused,
    isPending: isDeletingPending,
  } = useDeleteTravelogue();

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
    setDeleteModalAnnouncement("삭제 창이 열렸습니다.");
  };

  const handleCloseDeleteModal = () => {
    handleCloseMoreDropdown();
    setIsDeleteModalOpen(false);
    setDeleteModalAnnouncement("삭제 창이 닫쳤습니다.");
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

  const [heartButtonAnnouncement, setHeartButtonAnnouncement] = useState("");

  const { mutate: handleActiveHeart, isPaused: isPostingHeartPaused } = usePostUpdateHeart();
  const { mutate: handleInactiveHeart, isPaused: isDeletingHeartPaused } = useDeleteUpdateHeart();

  const handleHeartClick = () => {
    if (data?.isLiked) {
      handleInactiveHeart(id);
      setHeartButtonAnnouncement("좋아요를 취소했습니다.");

      return;
    }

    handleActiveHeart(id);
    setHeartButtonAnnouncement("좋아요를 눌렀습니다.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <Thumbnail imageUrl={data?.thumbnail} alt="썸네일 사진" aria-hidden={true} />
          <S.TitleContainer>
            <Text textType="title" css={S.titleStyle}>
              {data?.title}
            </Text>
            <S.IconButtonContainer>
              <S.AuthorInfoContainer>
                <Text
                  textType="detail"
                  css={S.authorDateStyle}
                  aria-label={`작성자 ${data?.authorNickname}`}
                >
                  {data?.authorNickname}
                </Text>
                <Text
                  textType="detail"
                  css={S.authorDateStyle}
                  aria-label={`작성일 ${data?.createdAt}`}
                >
                  {data?.createdAt}
                </Text>
              </S.AuthorInfoContainer>
              {isAuthor && (
                <div ref={moreContainerRef}>
                  <IconButton
                    iconType="more"
                    size="16"
                    color={theme.colors.text.secondary}
                    onClick={handleToggleMoreDropdown}
                    aria-label="더보기 버튼, 해당 버튼을 클릭하면 수정 및 삭제를 할 수 있습니다."
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
                        aria-label="클릭하면 삭제 창이 열립니다."
                      >
                        <Text textType="detail">삭제</Text>
                      </S.DropdownButton>
                    </Dropdown>
                  )}
                </div>
              )}
            </S.IconButtonContainer>
          </S.TitleContainer>
        </S.TravelogueDetailHeader>

        <S.TravelogueOverview>
          <Text textType="subTitle">{OVERVIEW_TEXT}</Text>
          <S.TravelogueCardChipsContainer>
            {data?.tags.map((tag) => (
              <Chip key={tag.id} label={tag.tag} aria-label={`${removeEmoji(tag.tag)} 태그`} />
            ))}
          </S.TravelogueCardChipsContainer>
        </S.TravelogueOverview>

        <Tab
          labels={data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
          tabContent={(selectedIndex) => (
            <TravelogueTabContent places={data?.days[selectedIndex]?.places ?? []} />
          )}
        />
      </S.TravelogueDetailLayout>
      <TransformFooter
        guideMessage="이 여행기를 따라가고 싶으신가요?"
        buttonLabel="여행 계획으로 가져오기"
        onTransform={handleTransform}
      >
        <S.LikesContainer>
          <VisuallyHidden aria-live="assertive">{heartButtonAnnouncement}</VisuallyHidden>
          <IconButton
            onClick={handleHeartClick}
            iconType={data?.isLiked ? "heart" : "empty-heart"}
            color={data?.isLiked ? SEMANTIC_COLORS.heart : undefined}
            size="24"
            aria-label="좋아요 버튼"
          />
          <Text textType="detail" aria-label={`좋아요 수 ${data.likeCount}`}>
            {data?.likeCount}
          </Text>
        </S.LikesContainer>
      </TransformFooter>

      <VisuallyHidden aria-live="assertive">{deleteModalAnnouncement}</VisuallyHidden>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          isPending={isDeletingPending}
          travelContent="travelogue"
          onCloseModal={handleCloseDeleteModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelogueDetailPage;
