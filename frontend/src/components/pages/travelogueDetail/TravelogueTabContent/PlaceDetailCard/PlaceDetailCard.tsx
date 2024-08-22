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

  const renderImage = () => {
    if (imageUrls.length === 0) {
      return (
        <S.ImageWrapper>
          <FallbackImage />
        </S.ImageWrapper>
      );
    }

    if (imageUrls.length === 1) {
      return imageError ? (
        <S.ImageWrapper>
          <FallbackImage />
        </S.ImageWrapper>
      ) : (
        <S.Image src={imageUrls[0]} alt={`${title} place`} onError={handleImageError} />
      );
    }

    return <Carousel imageUrls={imageUrls} />;
  };

  return (
    <S.PlaceDetailCardLayout>
      <S.PlaceDetailCardTitle>{`${index}. ${title}`}</S.PlaceDetailCardTitle>
      {renderImage()}
      <S.PlaceDetailCardDescription>{description}</S.PlaceDetailCardDescription>
    </S.PlaceDetailCardLayout>
  );
};

export default PlaceDetailCard;
