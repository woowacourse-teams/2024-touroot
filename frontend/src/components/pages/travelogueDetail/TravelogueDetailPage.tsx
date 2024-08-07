import { useState } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelogue from "@queries/useDeleteTravelogue";
import { useGetTravelogue } from "@queries/useGetTravelogue";

import { Dropdown, IconButton, Tab, Text, TransformBottomSheet } from "@components/common";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import TravelogueDeleteModal from "./TravelogueDeleteModal/TravelogueDeleteModal";
import * as S from "./TravelogueDetailPage.styled";

const TravelogueDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.replace(/[^\d]/g, "");

  const { data } = useGetTravelogue(id);

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

  const handleToggleModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const handleClickDeleteButton = () => {
    deleteTravelogue(Number(id));
  };

  //TODO: 수정 이벤트 추가해야함
  const handleClickReviseButton = () => {};

  const handleTransform = () => {
    onTransformTravelDetail(ROUTE_PATHS_MAP.travelPlanRegister, data);
    ReactGA.event({
      category: "TransformButton",
      action: "Click",
      label: "여행기를 여행 계획으로 전환",
    });
  };

  return (
    <>
      <S.TitleLayout>
        <Thumbnail imageUrl={data?.thumbnail} />
        <S.TitleContainer>
          <Text textType="subTitle" css={S.titleStyle}>
            {data?.title}
          </Text>
          <S.AuthorDateContainer>
            <Text textType="detail" css={S.authorDateStyle}>
              작성자
            </Text>
            <Text textType="detail" css={S.authorDateStyle}>
              2024-07-15
            </Text>
          </S.AuthorDateContainer>
          <S.IconButtonContainer>
            <S.LikesContainer>
              <IconButton iconType="empty-heart" size="24" />
              <Text textType="detail">7</Text>
            </S.LikesContainer>
            <S.MoreContainer>
              <IconButton
                iconType="more"
                size="16"
                color={theme.colors.text.secondary}
                onClick={handleToggleMoreDropdown}
              />
              <Dropdown isOpen={isDropdownOpen} size="small" position="right">
                <Text
                  textType="detail"
                  onClick={handleClickReviseButton}
                  css={S.cursorPointerStyle}
                >
                  수정
                </Text>
                <Text textType="detail" onClick={handleToggleModal} css={S.cursorPointerStyle}>
                  삭제
                </Text>
              </Dropdown>
            </S.MoreContainer>
          </S.IconButtonContainer>

          <Text textType="title" css={S.summaryTitleStyle}>
            {daysAndNights} 여행 한눈에 보기
          </Text>
        </S.TitleContainer>
      </S.TitleLayout>
      <Tab
        labels={data?.days.map((_, index) => `Day ${index + 1}`) ?? []}
        tabContent={(selectedIndex) => (
          <TravelogueTabContent places={data?.days[selectedIndex].places ?? []} />
        )}
      />
      <TransformBottomSheet onTransform={handleTransform} buttonLabel="여행 계획으로 전환">
        이 여행기를 따라가고 싶으신가요?
      </TransformBottomSheet>
      {isDeleteModalOpen && (
        <TravelogueDeleteModal
          isOpen={isDeleteModalOpen}
          onCloseModal={handleToggleModal}
          onClickDeleteButton={handleClickDeleteButton}
        />
      )}
    </>
  );
};

export default TravelogueDetailPage;
