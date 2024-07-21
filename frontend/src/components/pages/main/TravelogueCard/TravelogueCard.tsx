import { TravelogueOverview } from "types";

import AvatarCircle from "@components/common/AvatarCircle/AvatarCircle";

import { EmptyHeart } from "@assets/svg";

import * as S from "./TravelogueCard.styled";

interface TravelogueCardProps {
  travelogueOverview: TravelogueOverview;
}

const TravelogueCard = ({
  travelogueOverview: { userAvatar, title, thumbnail, likes },
}: TravelogueCardProps) => {
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
        <S.TravelogueCardThumbnail src={thumbnail} alt={`${title} 여행기 썸네일 이미지`} />
      </S.TravelogueCardThumbnailContainer>
    </S.TravelogueCardLayout>
  );
};

export default TravelogueCard;
