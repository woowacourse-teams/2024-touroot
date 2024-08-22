import { useNavigate } from "react-router-dom";

import { TravelogueResponse } from "@type/domain/travelogue";

import { AvatarCircle, Chip, FallbackImage, IconButton, Text } from "@components/common";

import useImageError from "@hooks/useImageError";

import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps {
  travelogueOverview: Pick<
    TravelogueResponse,
    "id" | "authorProfileUrl" | "title" | "thumbnail" | "authorNickname" | "likeCount" | "tags"
  >;
}

const TravelogueCard = ({
  travelogueOverview: {
    id,
    authorProfileUrl,
    title,
    thumbnail,
    authorNickname,
    likeCount = 0,
    tags,
  },
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
        <S.TravelogueCardTitle>{title}</S.TravelogueCardTitle>
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

      <S.TravelogueCardInfoContainer>
        <S.TravelogueCardAuthorContainer>
          <AvatarCircle profileImageUrl={authorProfileUrl} />
          <Text textType="detail">{authorNickname}</Text>
        </S.TravelogueCardAuthorContainer>

        <S.TravelogueCardLikesContainer>
          <IconButton onClick={handleLikeClick} iconType="empty-heart" size="20" />
          <Text textType="detail">{likeCount}</Text>
        </S.TravelogueCardLikesContainer>
      </S.TravelogueCardInfoContainer>

      <S.TravelogueCardChipsContainer>
        {tags.map((tag) => (
          <Chip key={tag.id} label={tag.tag} />
        ))}
      </S.TravelogueCardChipsContainer>
    </S.TravelogueCardLayout>
  );
};

export default TravelogueCard;
