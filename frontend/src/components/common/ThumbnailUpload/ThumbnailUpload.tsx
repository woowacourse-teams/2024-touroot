import { ChangeEvent, useRef, useState } from "react";

import { PictureIcon } from "@assets/svg";

import * as S from "./ThumbnailUpload.styled";

const ThumbnailUpload = () => {
  const [image, setImage] = useState<string>("");
  const [isShowEditButton, setIsShowEditButton] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleMouseOver = () => {
    setIsShowEditButton(true);
  };

  const handleMouseLeave = () => {
    setIsShowEditButton(false);
  };

  const HiddenInput = (
    <S.ThumbnailUploadHiddenInput
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      aria-label="썸네일 이미지 선택"
      title="이미지 파일을 선택하세요"
    />
  );

  return (
    <S.ThumbnailUploadContainer>
      {!image ? (
        <>
          <S.ThumbnailUploadButton
            type="button"
            onClick={handleButtonClick}
            aria-label="이미지 업로드"
          >
            <PictureIcon />
            <p>썸네일 업로드</p>
          </S.ThumbnailUploadButton>
          {HiddenInput}
        </>
      ) : (
        <S.ThumbnailUploadEditButtonContainer
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {isShowEditButton && (
            <S.ThumbnailUploadEditButton onClick={handleButtonClick}>
              썸네일 수정하기
            </S.ThumbnailUploadEditButton>
          )}
          <S.ThumbnailUploadImage src={image} alt="썸네일 이미지" />
          {HiddenInput}
        </S.ThumbnailUploadEditButtonContainer>
      )}
    </S.ThumbnailUploadContainer>
  );
};

export default ThumbnailUpload;
