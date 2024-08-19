import { css } from "@emotion/react";

import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import { Chip, FloatingButton, SearchFallback, Text } from "@components/common";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useTagSelection from "@hooks/useTagSelection";

import * as S from "./MainPage.styled";
import TravelogueCardSkeleton from "./TravelogueCard/skeleton/TravelogueCardSkeleton";

const SKELETON_COUNT = 5;

const MainPage = () => {
  const { selectedTagIDs, handleClickTag, createSortedTags } = useTagSelection();
  const { travelogues, status, fetchNextPage } = useInfiniteTravelogues(selectedTagIDs);

  const sortedTags = createSortedTags();

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const hasTravelogue = travelogues.length > 0;

  return (
    <S.MainPageContentContainer>
      <S.MainPageHeaderContainer>
        <Text textType="title">지금 뜨고 있는 여행기</Text>
        <Text textType="detail" css={S.subTitleColorStyle}>
          다른 이들의 여행을 한 번 구경해보세요.
        </Text>
      </S.MainPageHeaderContainer>

      <S.ChipsContainer
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
      </S.ChipsContainer>

      {status === "pending" && (
        <S.MainPageTraveloguesList>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TravelogueCardSkeleton key={index} />
          ))}
        </S.MainPageTraveloguesList>
      )}
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
          <SearchFallback title="휑" text="다른 태그를 선택해 주세요!" />
        )}
      </S.MainPageTraveloguesList>
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
