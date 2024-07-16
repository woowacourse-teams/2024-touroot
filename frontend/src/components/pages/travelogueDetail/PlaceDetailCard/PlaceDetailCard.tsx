import { Carousel } from "@components/common";

import * as S from "./PlaceDetailCard.styled";

interface PlaceDetailCardProps {
  index: number;
  title: string;
  imageUrls: string[];
  description: string;
}

const PlaceDetailCard: React.FC<PlaceDetailCardProps> = ({
  index,
  title,
  imageUrls,
  description,
}) => {
  return (
    <S.PlaceDetailCardLayout>
      <S.PlaceDetailCardTitle>{`${index}. ${title}`}</S.PlaceDetailCardTitle>
      <Carousel imageUrls={imageUrls} />
      <S.PlaceDetailCardDescription>{description}</S.PlaceDetailCardDescription>
    </S.PlaceDetailCardLayout>
  );
};

export default PlaceDetailCard;
