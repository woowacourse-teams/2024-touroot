import { TravelogueOverview } from "types";

import AvatarCircle from "@components/common/AvatarCircle/AvatarCircle";

import useImageError from "@hooks/useImageError";

import { EmptyHeart } from "@assets/svg";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps {
  travelogueOverview: TravelogueOverview;
}

const TravelogueCard = ({
  travelogueOverview: { userAvatar, title, thumbnail, likes = 0 },
}: TravelogueCardProps) => {
  const { imageError, handleImageError } = useImageError({ imageUrl: thumbnail });

  return (
    <S.TravelogueCardLayout>
      <S.TravelogueCardHeader>
        <S.TravelogueCardTitleContainer>
          <AvatarCircle userAvatar={userAvatar} />
          <h2>{title}</h2>
        </S.TravelogueCardTitleContainer>

        <S.TravelogueCardLikesContainer>
          <EmptyHeart />
          <p>{likes}</p>
        </S.TravelogueCardLikesContainer>
      </S.TravelogueCardHeader>

      <S.TravelogueCardThumbnailContainer>
        {!imageError ? (
          <S.TravelogueCardThumbnail
            src={thumbnail}
            alt={`${title} 여행기 썸네일 이미지`}
            onError={handleImageError}
          />
        ) : (
          // <div>없다 ㅋㅋ</div>
          <S.Fallback>No Image</S.Fallback>
        )}
      </S.TravelogueCardThumbnailContainer>
    </S.TravelogueCardLayout>
  );
};

export default TravelogueCard;
