import { useState } from "react";

import { css } from "@emotion/react";

import { NextArrow, PrevArrow } from "@assets/svg";

import * as S from "./Carousel.styled";

interface CarouselProps {
  imageUrls: string[];
}

const carouselImageListStyling = (currentIndex: number) => css`
  transform: translateX(-${currentIndex * 100}%);
`;

const Carousel = ({ imageUrls }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === imageUrls.length - 1;

  const handleClickPrevButton = () => {
    !isFirstImage && setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleClickNextButton = () => {
    !isLastImage && setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <S.CarouselContainer>
      <S.CarouselImageList css={carouselImageListStyling(currentIndex)}>
        {imageUrls.map((imageUrl, index) => (
          <S.CarouselImageItem key={imageUrl}>
            <img src={imageUrl} alt={`travels place img ${index + 1}`} />
          </S.CarouselImageItem>
        ))}
      </S.CarouselImageList>
      <S.CarouselImageBadge>{`${currentIndex + 1} / ${imageUrls.length}`}</S.CarouselImageBadge>
      <S.CarouselButton
        onClick={handleClickPrevButton}
        aria-label="Previous image"
        disabled={isFirstImage}
      >
        <PrevArrow />
      </S.CarouselButton>
      <S.CarouselButton
        onClick={handleClickNextButton}
        aria-label="Next image"
        disabled={isLastImage}
      >
        <NextArrow />
      </S.CarouselButton>
    </S.CarouselContainer>
  );
};

export default Carousel;
