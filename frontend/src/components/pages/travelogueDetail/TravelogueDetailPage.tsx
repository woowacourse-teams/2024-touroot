import { useState } from "react";
import { useLocation } from "react-router-dom";

import { css } from "@emotion/react";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import useDeleteTravelogue from "@queries/useDeleteTravelogue";
import { useGetTravelogue } from "@queries/useGetTravelogue";

import { IconButton, Tab, Text, TransformBottomSheet } from "@components/common";
import Dropdown from "@components/common/Dropdown/Dropdown";
import Thumbnail from "@components/pages/travelogueDetail/Thumbnail/Thumbnail";
import TravelogueTabContent from "@components/pages/travelogueDetail/TravelogueTabContent/TravelogueTabContent";

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

  return (
    <>
      <S.TitleLayout>
        <Thumbnail imageUrl={data?.thumbnail} />
        <S.TitleContainer>
          <Text
            textType="subTitle"
            css={css`
              line-height: 2.4rem;
            `}
          >
            {data?.title}
          </Text>
          <S.AuthorDateContainer>
            <Text
              textType="detail"
              css={css`
                color: ${theme.colors.text.secondary};
              `}
            >
              작성자
            </Text>
            <Text
              textType="detail"
              css={css`
                color: ${theme.colors.text.secondary};
              `}
            >
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
                  style={{ cursor: "pointer" }}
                >
                  수정
                </Text>
                <Text textType="detail" onClick={handleToggleModal} style={{ cursor: "pointer" }}>
                  삭제
                </Text>
              </Dropdown>
            </S.MoreContainer>
          </S.IconButtonContainer>

          <Text
            textType="title"
            css={css`
              margin: 1.6rem 0 3.2rem;
            `}
          >
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
      <TransformBottomSheet
        onTransform={() => onTransformTravelDetail("/travel-plans/register", data)}
        buttonLabel="여행 계획으로 전환"
      >
        이 여행기를 따라가고 싶으신가요?
      </TransformBottomSheet>
      <TravelogueDeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={handleToggleModal}
        onClickDeleteButton={handleClickDeleteButton}
      />
    </>
  );
};

export default TravelogueDetailPage;
