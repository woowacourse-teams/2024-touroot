import { useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation, useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelogue from "@queries/useDeleteTravelogue";
import { useGetTravelogue } from "@queries/useGetTravelogue";

import { Dropdown, IconButton, Tab, Text, TransformBottomSheet } from "@components/common";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueDetailSkeleton from "@components/pages/travelogueDetail/TravelogueDetailSkeleton/TravelogueDetailSkeleton";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import useClickAway from "@hooks/useClickAway";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useUser from "@hooks/useUser";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import TravelogueDeleteModal from "./TravelogueDeleteModal/TravelogueDeleteModal";
import * as S from "./TravelogueDetailPage.styled";

const TravelogueDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.replace(/[^\d]/g, "");

  const { user } = useUser();

  const { data, status, error } = useGetTravelogue(id);

  const isAuthor = data?.authorId === user?.memberId;

  const navigate = useNavigate();

  const daysAndNights =
    data?.days.length && data?.days.length > 1
      ? `${data?.days.length - 1}박 ${data?.days.length}일`
      : "당일치기";

  const { onTransformTravelDetail } = useTravelTransformDetailContext();
  const { mutate: deleteTravelogue } = useDeleteTravelogue();

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

  const debouncedClickDeleteButton = useLeadingDebounce(() => deleteTravelogue(Number(id)), 3000);

  const handleClickDeleteButton = () => {
    debouncedClickDeleteButton();
  };

  //TODO: 수정 이벤트 추가해야함
  // const handleClickReviseButton = () => {};
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

  if (status === "pending") return <TravelogueDetailSkeleton />;

  if (status === "error") {
    alert(error.message);
    navigate(ROUTE_PATHS_MAP.back);
    return;
  }

  return (
    <>
      <S.TitleLayout>
        <Thumbnail imageUrl={data?.thumbnail} />
        <S.TitleContainer>
          <Text textType="title" css={S.titleStyle}>
            {data?.title}
          </Text>
          <S.AuthorDateContainer>
            <Text textType="detail" css={S.authorDateStyle}>
              {data?.authorNickname}
            </Text>
            <Text textType="detail" css={S.authorDateStyle}>
              {data?.createdAt}
            </Text>
          </S.AuthorDateContainer>
          <S.IconButtonContainer>
            {/* //TODO: 하트 버튼 추가시 이용
            <S.LikesContainer>
              <IconButton iconType="empty-heart" size="24" />
              <Text textType="detail">7</Text>
            </S.LikesContainer> */}
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
                    {/* <Text
                      textType="detail"
                      onClick={handleClickReviseButton}
                      css={S.cursorPointerStyle}
                    >
                      수정
                    </Text> */}
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

          <Text textType="subTitle" css={S.summaryTitleStyle}>
            {daysAndNights} 여행 한눈에 보기
          </Text>
        </S.TitleContainer>
      </S.TitleLayout>
      <Tab
        labels={data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
        tabContent={(selectedIndex) => (
          <TravelogueTabContent places={data?.days[selectedIndex]?.places ?? []} />
        )}
      />
      <TransformBottomSheet onTransform={handleTransform} buttonLabel="여행 계획으로 전환">
        <Text textType="detail" css={S.transformBottomSheetTextStyle}>
          이 여행기를 따라가고 싶으신가요?
        </Text>
      </TransformBottomSheet>
      {isDeleteModalOpen && (
        <TravelogueDeleteModal
          isOpen={isDeleteModalOpen}
          onCloseModal={handleToggleDeleteModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelogueDetailPage;
