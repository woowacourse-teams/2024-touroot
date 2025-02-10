import { useState } from "react";

import { css } from "@emotion/react";

import VisuallyHidden from "@components/common/VisuallyHidden/VisuallyHidden";

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
      <VisuallyHidden aria-live="assertive">{`총 ${imageUrls.length}개 중 ${currentIndex + 1}번째 여행 사진`}</VisuallyHidden>
      <S.CarouselImageList css={carouselImageListStyling(currentIndex)}>
        {imageUrls.map((imageUrl, index) => (
          <S.CarouselImageItem key={imageUrl}>
            <img src={imageUrl} alt={`${index + 1}번째 여행 사진`} aria-hidden={true} />
          </S.CarouselImageItem>
        ))}
      </S.CarouselImageList>
      <S.CarouselImageBadge
        aria-hidden={true}
      >{`${currentIndex + 1} / ${imageUrls.length}`}</S.CarouselImageBadge>
      <S.CarouselButton
        onClick={handleClickPrevButton}
        disabled={isFirstImage}
        aria-label="이전 여행 사진"
      >
        <PrevArrow />
      </S.CarouselButton>
      <S.CarouselButton
        onClick={handleClickNextButton}
        disabled={isLastImage}
        aria-label="다음 여행 사진"
      >
        <NextArrow />
      </S.CarouselButton>
    </S.CarouselContainer>
  );
};

export default Carousel;
