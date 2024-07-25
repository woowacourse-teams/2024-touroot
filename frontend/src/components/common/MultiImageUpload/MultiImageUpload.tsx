import React from "react";

import { useDragScroll } from "@hooks/index";

import * as S from "./MultiImageUpload.styled";

const MAX_PICTURES_COUNT = 10;

interface MultiImageUploadProps extends React.ComponentPropsWithoutRef<"div"> {
  previewUrls: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (index: number) => void;
  onButtonClick: () => void;
}

const MultiImageUpload = ({
  previewUrls,
  fileInputRef,
  onImageChange,
  onDeleteImage,
  onButtonClick,
  ...props
}: MultiImageUploadProps) => {
  const { scrollRef, onMouseDown, onMouseUp, onMouseMove, isDragging } = useDragScroll();

  const hasPictures = previewUrls.length !== 0;

  return (
    <S.MultiImageUploadContainer {...props}>
      {hasPictures && (
        <S.MultiImageUploadPictureContainer>
          <S.MultiImageUploadPictureAddButton
            onClick={onButtonClick}
            type="button"
            $hasPicture={hasPictures}
          >
            <S.MultiImageUploadSVGWrapper>
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.24203 16.2804H16.7581C16.9884 16.2804 17.1611 16.1745 17.2763 15.9625C17.3915 15.7506 17.3723 15.5483 17.2187 15.3556L14.0518 11.107C13.9366 10.9529 13.7831 10.8758 13.5912 10.8758C13.3992 10.8758 13.2457 10.9529 13.1305 11.107L10.1363 15.1244L8.00588 12.2631C7.89072 12.1089 7.73717 12.0319 7.54524 12.0319C7.35331 12.0319 7.19976 12.1089 7.0846 12.2631L4.78139 15.3556C4.62785 15.5483 4.60865 15.7506 4.72381 15.9625C4.83897 16.1745 5.01171 16.2804 5.24203 16.2804ZM2.93883 20.9047C2.30545 20.9047 1.76304 20.6785 1.31161 20.2261C0.86095 19.7729 0.63562 19.2284 0.63562 18.5926V2.4076C0.63562 1.77176 0.86095 1.22725 1.31161 0.774072C1.76304 0.321663 2.30545 0.095459 2.93883 0.095459H19.0613C19.6947 0.095459 20.2371 0.321663 20.6885 0.774072C21.1392 1.22725 21.3645 1.77176 21.3645 2.4076V18.5926C21.3645 19.2284 21.1392 19.7729 20.6885 20.2261C20.2371 20.6785 19.6947 20.9047 19.0613 20.9047H2.93883Z"
                  fill="#0090FF"
                />
              </svg>
            </S.MultiImageUploadSVGWrapper>

            <p>
              {previewUrls.length} / {MAX_PICTURES_COUNT}
            </p>
          </S.MultiImageUploadPictureAddButton>
          <S.MultiImageUploadHiddenInput
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            aria-label="파일 선택"
            title="이미지 파일을 선택하세요"
          />

          <S.ImageScrollContainer
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            $isDragging={isDragging}
          >
            {previewUrls.map((previewUrl, index) => (
              <S.MultiImageUploadPictureWrapper key={previewUrl}>
                <S.MultiImageUploadDeleteButton onClick={() => onDeleteImage(index)}>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1002 11L0 9.9L4.40079 5.5L0 1.1L1.1002 0L5.50098 4.4L9.90177 0L11.002 1.1L6.60118 5.5L11.002 9.9L9.90177 11L5.50098 6.6L1.1002 11Z"
                      fill="#616161"
                    />
                  </svg>
                </S.MultiImageUploadDeleteButton>
                <S.MultiImageUploadPicture
                  src={previewUrl}
                  alt={`업로드된 이미지 ${index + 1}`}
                  draggable="false"
                />
              </S.MultiImageUploadPictureWrapper>
            ))}
          </S.ImageScrollContainer>
        </S.MultiImageUploadPictureContainer>
      )}
      {!hasPictures && (
        <S.MultiImageUploadContainer>
          <S.MultiImageUploadPictureAddButton
            onClick={onButtonClick}
            type="button"
            $hasPicture={hasPictures}
          >
            <S.MultiImageUploadSVGWrapper>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1331_438)">
                  <path
                    d="M22.0417 18.2083C22.0417 18.7167 21.8398 19.2042 21.4803 19.5636C21.1209 19.9231 20.6334 20.125 20.125 20.125H2.87504C2.36671 20.125 1.8792 19.9231 1.51975 19.5636C1.16031 19.2042 0.958374 18.7167 0.958374 18.2083V7.66667C0.958374 7.15833 1.16031 6.67082 1.51975 6.31138C1.8792 5.95193 2.36671 5.75 2.87504 5.75H6.70837L8.62504 2.875H14.375L16.2917 5.75H20.125C20.6334 5.75 21.1209 5.95193 21.4803 6.31138C21.8398 6.67082 22.0417 7.15833 22.0417 7.66667V18.2083Z"
                    stroke="#0090FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 16.2917C13.6171 16.2917 15.3334 14.5754 15.3334 12.4583C15.3334 10.3412 13.6171 8.625 11.5 8.625C9.38295 8.625 7.66671 10.3412 7.66671 12.4583C7.66671 14.5754 9.38295 16.2917 11.5 16.2917Z"
                    stroke="#0090FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1331_438">
                    <rect width="23" height="23" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </S.MultiImageUploadSVGWrapper>

            <p>
              {previewUrls.length} / {MAX_PICTURES_COUNT}
            </p>
          </S.MultiImageUploadPictureAddButton>
          <S.MultiImageUploadHiddenInput
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            aria-label="파일 선택"
            title="이미지 파일을 선택하세요"
          />
        </S.MultiImageUploadContainer>
      )}
    </S.MultiImageUploadContainer>
  );
};

export default MultiImageUpload;
