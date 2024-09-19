import { css } from "@emotion/react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import { Chip, FloatingButton, SearchFallback, Text } from "@components/common";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useTagSelection from "@hooks/useTagSelection";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import * as S from "./MainPage.styled";
import TravelogueCardSkeleton from "./TravelogueCard/skeleton/TravelogueCardSkeleton";

const SKELETON_COUNT = 5;

const MainPage = () => {
  const { selectedTagIDs, handleClickTag, sortedTags } = useTagSelection();
  const { travelogues, status, fetchNextPage, isPaused, error } =
    useInfiniteTravelogues(selectedTagIDs);

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const hasTravelogue = travelogues.length > 0;

  if (isPaused) {
    alert(ERROR_MESSAGE_MAP.network);
  }

  if (status === "error") {
    alert(error?.message);
  }

  return (
    <S.MainPageContentContainer>
      <S.MainPageHeaderContainer>
        <Text textType="title">지금 뜨고 있는 여행기</Text>
        <Text textType="detail" css={S.subTitleStyle}>
          다른 이들의 여행을 구경해보세요.{" "}
          <span>(태그는 최대 {FORM_VALIDATIONS_MAP.tags.maxCount}개까지 가능해요!)</span>
        </Text>
      </S.MainPageHeaderContainer>

      <S.MultiFilteringContainer
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {sortedTags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.tag}
            isSelected={selectedTagIDs.includes(tag.id)}
            onClick={() => handleClickTag(tag.id)}
          />
        ))}
      </S.MultiFilteringContainer>

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
      <div
        ref={lastElementRef}
        css={css`
          height: 1px;
        `}
      />
    </S.MainPageContentContainer>
  );
};

export default MainPage;
