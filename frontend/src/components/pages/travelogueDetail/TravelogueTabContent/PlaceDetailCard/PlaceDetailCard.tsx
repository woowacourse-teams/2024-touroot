import { Carousel, FallbackImage } from "@components/common";

import useImageError from "@hooks/useImageError";

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
  const { imageError, handleImageError } = useImageError({ imageUrl: imageUrls[0] });

  return (
    <S.PlaceDetailCardLayout>
      <S.PlaceDetailCardTitle>{`${index}. ${title}`}</S.PlaceDetailCardTitle>
      {imageUrls.length === 1 ? (
        !imageError ? (
          <S.Image src={imageUrls[0]} alt={`${title} place`} onError={handleImageError} />
        ) : (
          <S.ImageWrapper>
            <FallbackImage />
          </S.ImageWrapper>
        )
      ) : (
        <Carousel imageUrls={imageUrls} />
      )}

      <S.PlaceDetailCardDescription>{description}</S.PlaceDetailCardDescription>
    </S.PlaceDetailCardLayout>
  );
};

export default PlaceDetailCard;
