import { useState } from "react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import {
  Chip,
  FloatingButton,
  Icon,
  SearchFallback,
  SingleSelectionTagModalBottomSheet,
  Text,
} from "@components/common";
import VisuallyHidden from "@components/common/VisuallyHidden/VisuallyHidden";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";
import useSingleSelectionTag from "@hooks/useSingleSelectionTag";
import useTravelogueCardFocus from "@hooks/useTravelogueCardFocus";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import { removeEmoji } from "@utils/removeEmojis";

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
  const { selectedTagIDs, handleClickTag, sortedTags, animationKey } = useMultiSelectionTag(
    STORAGE_KEYS_MAP.mainPageSelectedTagIDs,
  );
  const { sorting, travelPeriod } = useSingleSelectionTag(
    STORAGE_KEYS_MAP.mainPageSort,
    STORAGE_KEYS_MAP.mainPageTravelPeriod,
  );

  const { travelogues, status, fetchNextPage, isPaused, error, isFetchingNextPage } =
    useInfiniteTravelogues({
      selectedTagIDs,
      selectedSortingOption: sorting.selectedOption,
      selectedTravelPeriodOption: travelPeriod.selectedOption,
    });

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const [isFocused, setIsFocused] = useState(false);

  const hasTravelogue = travelogues.length > 0;

  const [tagSelectionAnnouncement, setTagSelectionAnnouncement] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const cardRefs = useTravelogueCardFocus(isFetchingNextPage);

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
            다른 이들의 여행을 구경해보세요. ( 태그는 최대 {FORM_VALIDATIONS_MAP.tags.maxCount}
            개까지 가능해요! )
          </Text>
        </S.TitleContainer>

        <S.TagsContainer>
          <S.SingleSelectionTagsContainer>
            <Chip
              as="button"
              aria-label="여행기 정렬"
              label={SORTING_OPTIONS_MAP[sorting.selectedOption]}
              isSelected={true}
              onClick={sorting.handleOpenModal}
            >
              <Icon iconType="down-arrow" size="8" color={theme.colors.primary} />
            </Chip>
            <Chip
              as="button"
              aria-label="여행기 필터"
              label={
                travelPeriod.selectedOption
                  ? TRAVEL_PERIOD_OPTIONS_MAP[travelPeriod.selectedOption]
                  : "여행 기간"
              }
              isSelected={travelPeriod.selectedOption !== ""}
              onClick={travelPeriod.handleOpenModal}
            >
              <Icon
                iconType="down-arrow"
                size="8"
                color={
                  travelPeriod.selectedOption ? theme.colors.primary : theme.colors.text.secondary
                }
              />
            </Chip>
          </S.SingleSelectionTagsContainer>

          <S.MultiSelectionTagsContainer
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {sortedTags.map((tag, index) => {
              const isSelected = selectedTagIDs.includes(tag.id);
              const tagName = removeEmoji(tag.tag);

              return (
                <li key={`${tag.id}-${animationKey}`}>
                  <Chip
                    as="button"
                    key={`${tag.id}-${animationKey}`}
                    index={index}
                    label={tag.tag}
                    isSelected={isSelected}
                    onClick={() => {
                      handleClickTag(tag.id);
                      setTagSelectionAnnouncement(
                        isSelected
                          ? `${tagName} 태그가 선택 해제되었습니다.`
                          : `${tagName} 태그가 선택되었습니다.`,
                      );
                    }}
                    aria-label={`${tagName} 태그`}
                  />
                </li>
              );
            })}
          </S.MultiSelectionTagsContainer>
          <VisuallyHidden aria-live="assertive">{tagSelectionAnnouncement}</VisuallyHidden>
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
          <>
            <VisuallyHidden aria-live="assertive">{announcement}</VisuallyHidden>
            <S.MainPageTraveloguesList>
              {hasTravelogue ? (
                travelogues.map(
                  (
                    { authorProfileUrl, authorNickname, id, title, thumbnail, likeCount, tags },
                    index,
                  ) => (
                    <S.MainPageList key={id}>
                      <TravelogueCard
                        ref={(el) => (cardRefs.current[index] = el)}
                        key={index}
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
                    </S.MainPageList>
                  ),
                )
              ) : (
                <S.SearchFallbackWrapper>
                  <SearchFallback title="휑" text="여행기가 존재하지 않아요!" />
                </S.SearchFallbackWrapper>
              )}
            </S.MainPageTraveloguesList>
          </>
        )}

        <S.FetchButton
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={async () => {
            await fetchNextPage();
            setAnnouncement("새로운 여행기가 로드되었습니다.");
          }}
          aria-label="더 많은 여행기 불러오기"
        >
          더 불러오기
        </S.FetchButton>

        {!isFocused && <S.LastElement ref={lastElementRef} />}
        <S.LastElement ref={lastElementRef} />

        <VisuallyHidden aria-live="assertive">
          {sorting.isModalOpen
            ? "여행기 정렬 모달이 열렸습니다."
            : "여행기 정렬 모달이 닫혔습니다."}
        </VisuallyHidden>
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
        <FloatingButton />

        <VisuallyHidden aria-live="assertive">
          {travelPeriod.isModalOpen
            ? "여행기 필터 모달이 열렸습니다."
            : "여행기 필터 모달이 닫혔습니다."}
        </VisuallyHidden>
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
      </S.MainPageLayout>
    </>
  );
};

export default MainPage;
