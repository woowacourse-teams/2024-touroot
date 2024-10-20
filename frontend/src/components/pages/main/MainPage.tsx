import { useEffect, useMemo } from "react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import {
  Chip,
  FloatingButton,
  Icon,
  SearchFallback,
  SingleSelectionTagModalBottomSheet,
  Text,
} from "@components/common";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";
import useSingleSelectionTag from "@hooks/useSingleSelectionTag";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import theme from "@styles/theme";

import {
  SKELETON_COUNT,
  SORTING_OPTIONS,
  SORTING_OPTIONS_MAP,
  TRAVEL_PERIOD_OPTIONS,
  TRAVEL_PERIOD_OPTIONS_MAP,
} from "./MainPage.constants";
import * as S from "./MainPage.styled";
import TravelogueCardSkeleton from "./TravelogueCard/skeleton/TravelogueCardSkeleton";

const MainPage = () => {
  const {
    selectedTagIDs,
    handleClickTag,
    sortedTags,
    multiSelectionTagAnimationKey,
    resetMultiSelectionTag,
  } = useMultiSelectionTag(STORAGE_KEYS_MAP.mainPageSelectedTagIDs);

  const {
    sorting,
    travelPeriod,
    resetSingleSelectionTags,
    singleSelectionAnimationKey,
    increaseSingleSelectionAnimationKey,
  } = useSingleSelectionTag(STORAGE_KEYS_MAP.mainPageSort, STORAGE_KEYS_MAP.mainPageTravelPeriod);

  const isTagsSelected = useMemo(() => {
    return (
      selectedTagIDs.length !== 0 ||
      sorting.selectedOption !== "likeCount" ||
      travelPeriod.selectedOption !== ""
    );
  }, [selectedTagIDs, sorting.selectedOption, travelPeriod.selectedOption]);

  useEffect(() => {
    increaseSingleSelectionAnimationKey();
  }, [isTagsSelected]);

  const handleClickResetButton = () => {
    resetMultiSelectionTag();
    resetSingleSelectionTags();
  };

  const { travelogues, status, fetchNextPage, isPaused, error } = useInfiniteTravelogues({
    selectedTagIDs,
    selectedSortingOption: sorting.selectedOption,
    selectedTravelPeriodOption: travelPeriod.selectedOption,
  });

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragScroll<HTMLUListElement>();

  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const hasTravelogue = travelogues.length > 0;

  if (isPaused) {
    alert(ERROR_MESSAGE_MAP.network);
  }

  if (status === "error") {
    alert(error?.message);
  }

  return (
    <>
      <S.FixedLayout>
        <S.TitleContainer>
          <Text textType="title">지금 뜨고 있는 여행기</Text>
          <Text textType="detail" css={S.subTitleStyle}>
            다른 이들의 여행을 구경해보세요.{" "}
            <span>(태그는 최대 {FORM_VALIDATIONS_MAP.tags.maxCount}개까지 가능해요!)</span>
          </Text>
        </S.TitleContainer>

        <S.TagsContainer>
          <S.SingleSelectionTagsContainer>
            {isTagsSelected && (
              <Chip
                key={`reset-${singleSelectionAnimationKey}`}
                label={`초기화`}
                isSelected={false}
                onClick={handleClickResetButton}
                iconPosition="left"
                iconType="reset-icon"
              />
            )}
            <Chip
              key={`sorting-${singleSelectionAnimationKey}`}
              label={SORTING_OPTIONS_MAP[sorting.selectedOption]}
              isSelected={true}
              onClick={sorting.handleOpenModal}
              iconPosition="left"
              iconType="sort-icon"
            />
            <Chip
              key={`travelPeriod-${singleSelectionAnimationKey}`}
              label={
                travelPeriod.selectedOption
                  ? TRAVEL_PERIOD_OPTIONS_MAP[travelPeriod.selectedOption]
                  : "여행 기간"
              }
              iconPosition="right"
              isSelected={travelPeriod.selectedOption !== ""}
              onClick={travelPeriod.handleOpenModal}
            />
          </S.SingleSelectionTagsContainer>

          <S.MultiSelectionTagsContainer
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {sortedTags.map((tag, index) => (
              <Chip
                key={`${tag.id}-${multiSelectionTagAnimationKey}`}
                index={index}
                label={tag.tag}
                isSelected={selectedTagIDs.includes(tag.id)}
                onClick={() => handleClickTag(tag.id)}
              />
            ))}
          </S.MultiSelectionTagsContainer>
        </S.TagsContainer>
      </S.FixedLayout>

      <S.MainPageLayout>
        {status === "pending" && (
          <S.MainPageTraveloguesList>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <TravelogueCardSkeleton key={index} />
            ))}
          </S.MainPageTraveloguesList>
        )}
        {status === "success" && (
          <S.MainPageTraveloguesList>
            {hasTravelogue ? (
              travelogues.map(
                ({ authorProfileUrl, authorNickname, id, title, thumbnail, likeCount, tags }) => (
                  <TravelogueCard
                    key={id}
                    travelogueOverview={{
                      authorProfileUrl,
                      id,
                      title,
                      thumbnail,
                      likeCount,
                      authorNickname,
                      tags,
                    }}
                  />
                ),
              )
            ) : (
              <S.SearchFallbackWrapper>
                <SearchFallback title="휑" text="여행기가 존재하지 않아요!" />
              </S.SearchFallbackWrapper>
            )}
          </S.MainPageTraveloguesList>
        )}
        <FloatingButton />
        <S.LastElement ref={lastElementRef} />

        <SingleSelectionTagModalBottomSheet
          isOpen={sorting.isModalOpen}
          onClose={sorting.handleCloseModal}
          mainText="여행기 정렬을 선택해 주세요!"
        >
          {SORTING_OPTIONS.map((option, index) => (
            <S.OptionContainer key={index} onClick={() => sorting.handleClickOption(option)}>
              {option === sorting.selectedOption ? (
                <>
                  <Text textType="detailBold" css={S.selectedOptionStyle}>
                    {SORTING_OPTIONS_MAP[option]}
                  </Text>
                  <Icon iconType="down-arrow" size="12" color={theme.colors.primary} />
                </>
              ) : (
                <Text textType="detail" css={S.unselectedOptionStyle}>
                  {SORTING_OPTIONS_MAP[option]}
                </Text>
              )}
            </S.OptionContainer>
          ))}
        </SingleSelectionTagModalBottomSheet>

        <SingleSelectionTagModalBottomSheet
          isOpen={travelPeriod.isModalOpen}
          onClose={travelPeriod.handleCloseModal}
          mainText="여행 기간을 선택해 주세요!"
        >
          {TRAVEL_PERIOD_OPTIONS.map((option, index) => (
            <S.OptionContainer key={index} onClick={() => travelPeriod.handleClickOption(option)}>
              {option === travelPeriod.selectedOption ? (
                <>
                  <Text textType="detailBold" css={S.selectedOptionStyle}>
                    {TRAVEL_PERIOD_OPTIONS_MAP[option]}
                  </Text>
                  <Icon iconType="down-arrow" size="12" color={theme.colors.primary} />
                </>
              ) : (
                <Text textType="detail" css={S.unselectedOptionStyle}>
                  {TRAVEL_PERIOD_OPTIONS_MAP[option]}
                </Text>
              )}
            </S.OptionContainer>
          ))}
        </SingleSelectionTagModalBottomSheet>
      </S.MainPageLayout>
    </>
  );
};

export default MainPage;
