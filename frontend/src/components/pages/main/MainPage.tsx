import { useEffect, useState } from "react";

import { css } from "@emotion/react";

import { Tag } from "@type/domain/travelogue";

import useGetTags from "@queries/useGetTags";
import useInfiniteTravelogues from "@queries/useInfiniteTravelogues";

import { Chip, Text } from "@components/common";
import FloatingButton from "@components/common/FloatingButton/FloatingButton";
import TravelogueCard from "@components/pages/main/TravelogueCard/TravelogueCard";

import { useDragScroll } from "@hooks/useDragScroll";
import useIntersectionObserver from "@hooks/useIntersectionObserver";

import * as S from "./MainPage.styled";
import TravelogueCardSkeleton from "./TravelogueCard/skeleton/TravelogueCardSkeleton";

const MainPage = () => {
  const SKELETON_COUNT = 5;
  const MAX_TAGS_COUNT = 3;

  const { data: tags } = useGetTags();

  const [sortedTags, setSortedTags] = useState<Tag[]>([]);
  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>([]);

  useEffect(() => {
    if (tags) {
      setSortedTags(tags);
    }
  }, [tags]);

  const { travelogues, status, fetchNextPage } = useInfiniteTravelogues(selectedTagIDs);
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const handleClickChip = (id: number) => {
    setSelectedTagIDs((prevSelectedTagIDs) => {
      const newSelectedTagIDs = prevSelectedTagIDs.includes(id)
        ? prevSelectedTagIDs.filter((selectedTagID) => selectedTagID !== id)
        : [...prevSelectedTagIDs, id];

      if (newSelectedTagIDs.length > MAX_TAGS_COUNT) return prevSelectedTagIDs;

      setSortedTags((prevSortedTags) => {
        const selected = prevSortedTags.filter((tag) => newSelectedTagIDs.includes(tag.id));
        const unselected = prevSortedTags.filter((tag) => !newSelectedTagIDs.includes(tag.id));
        return [...selected, ...unselected];
      });

      return newSelectedTagIDs;
    });
  };

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll();

  return (
    <S.MainPageContentContainer>
      <S.MainPageHeaderContainer>
        <Text textType="title">지금 뜨고 있는 여행기</Text>
        <Text textType="detail" css={S.subTitleColorStyle}>
          다른 이들의 여행을 한 번 구경해보세요.
        </Text>
      </S.MainPageHeaderContainer>

      <S.Chips
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
            onClick={() => handleClickChip(tag.id)}
          />
        ))}
      </S.Chips>

      {status === "pending" && (
        <S.MainPageTraveloguesList>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TravelogueCardSkeleton key={index} />
          ))}
        </S.MainPageTraveloguesList>
      )}
      <S.MainPageTraveloguesList>
        {travelogues.map(
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
