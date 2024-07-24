import { useState } from "react";

import { PictureIcon } from "@assets/svg";

import * as S from "./ThumbnailUpload.styled";

interface ThumbnailUploadProps {
  previewUrls: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
}

const ThumbnailUpload = ({
  previewUrls,
  fileInputRef,
  onChangeImage,
  onClickButton,
}: ThumbnailUploadProps) => {
  const [isShowEditButton, setIsShowEditButton] = useState<boolean>(false);

  const handleMouseOver = () => setIsShowEditButton(true);
  const handleMouseLeave = () => setIsShowEditButton(false);

  const image = previewUrls[0];

  const HiddenInput = (
    <S.ThumbnailUploadHiddenInput
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onChangeImage}
      aria-label="썸네일 이미지 선택"
      title="이미지 파일을 선택하세요"
    />
  );

  return (
    <S.ThumbnailUploadContainer>
      {!image ? (
        <>
          <S.ThumbnailUploadButton type="button" onClick={onClickButton} aria-label="이미지 업로드">
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
            <S.ThumbnailUploadEditButton onClick={onClickButton}>
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
