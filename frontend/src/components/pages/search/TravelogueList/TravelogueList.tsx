import { useEffect, useMemo } from "react";

import { css } from "@emotion/react";

import type { SearchType } from "@type/domain/travelogue";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import {
  Chip,
  Icon,
  SearchFallback,
  SingleSelectionTagModalBottomSheet,
  Text,
} from "@components/common";
import {
  SORTING_OPTIONS,
  SORTING_OPTIONS_MAP,
  TRAVEL_PERIOD_OPTIONS,
  TRAVEL_PERIOD_OPTIONS_MAP,
} from "@components/pages/main/MainPage.constants";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";
import TravelogueCardSkeleton from "@components/pages/main/TravelogueCard/skeleton/TravelogueCardSkeleton";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";
import useSingleSelectionTag from "@hooks/useSingleSelectionTag";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import { removeEmoji } from "@utils/removeEmojis";

import theme from "@styles/theme";

import EmptySearchResult from "./EmptySearchResult";
import * as S from "./TravelogueList.styled";

const SKELETON_COUNT = 5;

interface TravelogueListProps {
  keyword: string;
  searchType: SearchType;
}

const TravelogueList = ({ keyword, searchType }: TravelogueListProps) => {
  const {
    selectedTagIDs,
    sortedTags,
    multiSelectionTagAnimationKey,
    handleClickTag,
    resetMultiSelectionTag,
  } = useMultiSelectionTag(STORAGE_KEYS_MAP.searchPageSelectedTagIDs);

  const {
    sorting,
    travelPeriod,
    singleSelectionAnimationKey,
    resetSingleSelectionTags,
    increaseSingleSelectionAnimationKey,
  } = useSingleSelectionTag(
    STORAGE_KEYS_MAP.searchPageSort,
    STORAGE_KEYS_MAP.searchPageTravelPeriod,
  );

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragScroll<HTMLUListElement>();

  const isTagsSelected = useMemo(() => {
    return (
      selectedTagIDs.length !== 0 ||
      sorting.selectedOption !== "likeCount" ||
      travelPeriod.selectedOption !== ""
    );
  }, [selectedTagIDs, sorting.selectedOption, travelPeriod.selectedOption]);

  useEffect(() => {
    increaseSingleSelectionAnimationKey();
  }, [isTagsSelected, increaseSingleSelectionAnimationKey]);

  const handleClickResetButton = () => {
    resetMultiSelectionTag();
    resetSingleSelectionTags();
  };

  const { travelogues, status, fetchNextPage, isPaused, error } = useInfiniteTravelogues({
    selectedTagIDs,
    selectedSortingOption: sorting.selectedOption,
    selectedTravelPeriodOption: travelPeriod.selectedOption,
    keyword,
    searchType,
  });

  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const renderTags = () => {
    return (
      <>
        {sorting.isModalOpen && (
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
        )}

        {travelPeriod.isModalOpen && (
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
        )}

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
              as="button"
              aria-label="여행기 정렬"
              key={`sorting-${singleSelectionAnimationKey}`}
              label={SORTING_OPTIONS_MAP[sorting.selectedOption]}
              isSelected={true}
              onClick={sorting.handleOpenModal}
              iconPosition="left"
              iconType="sort-icon"
            />
            <Chip
              as="button"
              aria-label="여행기 필터"
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
            onMouseLeave={handleMouseUp}
          >
            {sortedTags.map((tag, index) => {
              const isSelected = selectedTagIDs.includes(tag.id);
              const tagName = removeEmoji(tag.tag);

              return (
                <li key={`${tag.id}-${multiSelectionTagAnimationKey}`}>
                  <Chip
                    as="button"
                    key={`${tag.id}-${multiSelectionTagAnimationKey}`}
                    index={index}
                    label={tag.tag}
                    isSelected={isSelected}
                    onClick={() => handleClickTag(tag.id)}
                    aria-label={`${tagName} 태그`}
                  />
                </li>
              );
            })}
          </S.MultiSelectionTagsContainer>
        </S.TagsContainer>
      </>
    );
  };

  if (travelogues.length === 0 && status === "success") {
    return (
      <S.Layout>
        <S.FixedLayout>
          {keyword && <Text textType="title">{`"${keyword}" 검색 결과`}</Text>}
          {renderTags()}
        </S.FixedLayout>
        <S.SearchFallbackWrapper>
          <SearchFallback title="휑" text="검색 결과가 없어요." />
        </S.SearchFallbackWrapper>
      </S.Layout>
    );
  }

  if (status === "error") {
    error && alert(error.message);

    return <EmptySearchResult keyword={keyword} />;
  }

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return (
    <S.Layout>
      <S.FixedLayout>
        {keyword && <Text textType="title">{`"${keyword}" 검색 결과`}</Text>}
        {renderTags()}
      </S.FixedLayout>

      <S.MainPageTraveloguesList>
        {status === "pending" && (
          <S.MainPageTraveloguesList>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <TravelogueCardSkeleton key={index} />
            ))}
          </S.MainPageTraveloguesList>
        )}
        {travelogues.map(
          ({ id, title, thumbnail, authorProfileUrl, likeCount, tags, authorNickname }) => (
            <TravelogueCard
              key={id}
              travelogueOverview={{
                id,
                title,
                thumbnail,
                authorProfileUrl,
                likeCount,
                tags,
                authorNickname,
              }}
            />
          ),
        )}
        <div
          ref={lastElementRef}
          css={css`
            height: 1px;
          `}
        />
      </S.MainPageTraveloguesList>
    </S.Layout>
  );
};

export default TravelogueList;
