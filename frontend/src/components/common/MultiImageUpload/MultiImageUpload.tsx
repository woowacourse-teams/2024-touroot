import { ChangeEvent, PropsWithChildren, useRef, useState } from "react";

import { css } from "@emotion/react";

import { PictureIcon } from "@assets/svg";

import * as S from "./MultiImageUpload.styled";

const MAX_PICTURES_COUNT = 10;

const MultiImageUpload: React.FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasPictures = images.length !== 0;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <S.MultiImageUploadPictureContainer>
        {hasPictures && (
          <S.MultiImageUploadPicturesInfo>
            {/* <PictureIcon /> */}
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

            <p>
              {images.length} / {MAX_PICTURES_COUNT}
            </p>
          </S.MultiImageUploadPicturesInfo>
        )}
        {images.map((image, index) => (
          <S.MultiImageUploadPicture key={index} src={image} alt={`업로드된 이미지 ${index + 1}`} />
        ))}
      </S.MultiImageUploadPictureContainer>
      {children}
      {!hasPictures && (
        <>
          <S.MultiImageUploadButton
            type="button"
            onClick={handleButtonClick}
            aria-label="이미지 업로드"
          >
            <PictureIcon />
            <span>사진 업로드</span>
          </S.MultiImageUploadButton>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            css={css`
              display: none;
            `}
            aria-label="파일 선택"
            title="이미지 파일을 선택하세요"
          />
        </>
      )}
    </div>
  );
};

export default MultiImageUpload;
