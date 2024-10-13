import React from "react";
import { useNavigate } from "react-router-dom";

import { TravelogueResponse } from "@type/domain/travelogue";

import { AvatarCircle, Chip, FallbackImage, Icon, Text } from "@components/common";

import useImageError from "@hooks/useImageError";

import { CYPRESS_DATA_MAP } from "@constants/cypress";
import { ROUTE_PATHS_MAP } from "@constants/route";

import removeEmojis from "@utils/removeEmojis";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps extends React.ComponentPropsWithoutRef<"button"> {
  travelogueOverview: Pick<
    TravelogueResponse,
    "id" | "authorProfileUrl" | "title" | "thumbnail" | "authorNickname" | "likeCount" | "tags"
  >;
}

const getCardAriaLabel = ({
  title,
  authorNickname,
  likeCount,
  tags,
}: Pick<TravelogueResponse, "title" | "authorNickname" | "likeCount" | "tags">) => {
  const tagText = removeEmojis(tags);
  const tagPart = tagText ? `태그: ${tagText}` : "";

  return `${title} 여행기. ${authorNickname} 작성. 좋아요 수: ${likeCount}개. ${tagPart}`;
};

const TravelogueCard = React.forwardRef<HTMLButtonElement, TravelogueCardProps>(
  ({ travelogueOverview, ...props }, ref) => {
    const {
      id,
      authorProfileUrl,
      title,
      thumbnail,
      authorNickname,
      likeCount = 0,
      tags,
    } = travelogueOverview;

    const navigate = useNavigate();
    const { imageError, handleImageError } = useImageError({ imageUrl: thumbnail });

    const handleCardClick = () => {
      navigate(ROUTE_PATHS_MAP.travelogue(id));
    };

    return (
      <S.TravelogueCardButton
        ref={ref}
        data-cy={CYPRESS_DATA_MAP.main.travelogueItem}
        onClick={handleCardClick}
        aria-label={getCardAriaLabel({ title, authorNickname, likeCount, tags })}
        {...props}
      >
        <S.TravelogueCardHeader>
          <Text textType="bodyBold">{title}</Text>
        </S.TravelogueCardHeader>

        <S.TravelogueCardThumbnailContainer>
          {!imageError ? (
            <S.TravelogueCardThumbnail src={thumbnail} alt="" onError={handleImageError} />
          ) : (
            <FallbackImage />
          )}
        </S.TravelogueCardThumbnailContainer>

        <S.TravelogueCardInfoContainer>
          <S.TravelogueCardAuthorContainer>
            <AvatarCircle profileImageUrl={authorProfileUrl} alt="" />
            <Text textType="detail">{authorNickname}</Text>
          </S.TravelogueCardAuthorContainer>

          <S.TravelogueCardLikesContainer>
            <Icon iconType="empty-heart" size="20" />
            <Text textType="detail">{likeCount}</Text>
          </S.TravelogueCardLikesContainer>
        </S.TravelogueCardInfoContainer>

        <S.TravelogueCardChipsContainer>
          {tags.map((tag) => (
            <Chip key={tag.id} label={tag.tag} />
          ))}
        </S.TravelogueCardChipsContainer>
      </S.TravelogueCardButton>
    );
  },
);

export default TravelogueCard;
