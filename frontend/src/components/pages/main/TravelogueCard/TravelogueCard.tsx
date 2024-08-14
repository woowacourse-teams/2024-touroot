import { useNavigate } from "react-router-dom";

import { TravelogueResponse } from "@type/domain/travelogue";

import { AvatarCircle, FallbackImage, IconButton, Text } from "@components/common";

import useImageError from "@hooks/useImageError";

import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps {
  travelogueOverview: Pick<
    TravelogueResponse,
    "id" | "authorProfileUrl" | "title" | "thumbnail" | "authorNickname" | "likeCount"
  >;
}

const TravelogueCard = ({
  travelogueOverview: { id, authorProfileUrl, title, thumbnail, authorNickname, likeCount = 0 },
}: TravelogueCardProps) => {
  const navigate = useNavigate();

  const { imageError, handleImageError } = useImageError({ imageUrl: thumbnail });

  const handleCardClick = () => {
    navigate(ROUTE_PATHS_MAP.travelogue(id));
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.TravelogueCardLayout onClick={handleCardClick}>
      <S.TravelogueCardHeader>
        <Text textType="body" css={S.textBoldStyle}>
          {title}
        </Text>
      </S.TravelogueCardHeader>

      <S.TravelogueCardThumbnailContainer>
        {!imageError ? (
          <S.TravelogueCardThumbnail
            src={thumbnail}
            alt={`${title} 여행기 썸네일 이미지`}
            onError={handleImageError}
          />
        ) : (
          <FallbackImage />
        )}
      </S.TravelogueCardThumbnailContainer>
      <S.TravelogueCardFooter>
        <S.TravelogueCardTitleContainer>
          <AvatarCircle profileImageUrl={authorProfileUrl} />
          <Text textType="detail">{authorNickname}</Text>
        </S.TravelogueCardTitleContainer>

        <S.TravelogueCardLikesContainer>
          <IconButton onClick={handleLikeClick} iconType="empty-heart" size="20" />
          <Text textType="detail">{likeCount}</Text>
        </S.TravelogueCardLikesContainer>
      </S.TravelogueCardFooter>
    </S.TravelogueCardLayout>
  );
};

export default TravelogueCard;
