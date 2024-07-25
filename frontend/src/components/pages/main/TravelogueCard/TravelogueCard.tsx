import { useNavigate } from "react-router-dom";

import { TravelogueOverview } from "types";

import AvatarCircle from "@components/common/AvatarCircle/AvatarCircle";

import useImageError from "@hooks/useImageError";

import { EmptyHeart } from "@assets/svg";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps {
  travelogueOverview: TravelogueOverview;
}

const TravelogueCard = ({
  travelogueOverview: { id, userAvatar, title, thumbnail, likes = 0 },
}: TravelogueCardProps) => {
  const navigate = useNavigate();
  const { imageError, handleImageError } = useImageError({ imageUrl: thumbnail });

  const handleCardClick = () => {
    navigate(`/travelogue/${id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.TravelogueCardLayout onClick={handleCardClick}>
      <S.TravelogueCardThumbnailContainer>
        {!imageError ? (
          <S.TravelogueCardThumbnail
            src={thumbnail}
            alt={`${title} 여행기 썸네일 이미지`}
            onError={handleImageError}
          />
        ) : (
          <S.Fallback>No Image</S.Fallback>
        )}
      </S.TravelogueCardThumbnailContainer>
      <S.TravelogueCardHeader>
        <S.TravelogueCardTitleContainer>
          <AvatarCircle userAvatar={userAvatar} />
          <h2>{title}</h2>
        </S.TravelogueCardTitleContainer>

        <S.TravelogueCardLikesContainer onClick={handleLikeClick}>
          <EmptyHeart />
          <p>{likes}</p>
        </S.TravelogueCardLikesContainer>
      </S.TravelogueCardHeader>
    </S.TravelogueCardLayout>
  );
};

export default TravelogueCard;
