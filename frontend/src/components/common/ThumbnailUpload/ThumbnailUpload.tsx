import { InputHTMLAttributes, useState } from "react";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import { PictureIcon } from "@assets/svg";

import IconButton from "../IconButton/IconButton";
import Spinner from "../Spinner/Spinner";
import * as S from "./ThumbnailUpload.styled";

interface ThumbnailUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  previewUrls: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
  onDeleteButton?: () => void;
}

const ThumbnailUpload = ({
  id,
  previewUrls,
  fileInputRef,
  onChangeImage,
  onClickButton,
  onDeleteButton,
}: ThumbnailUploadProps) => {
  const [isShowEditButton, setIsShowEditButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleMouseOver = () => {
    if (!isLoading) setIsShowEditButton(true);
  };
  const handleMouseLeave = () => {
    if (!isLoading) setIsShowEditButton(false);
  };

  const image = previewUrls[0];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const HiddenInput = (
    <S.ThumbnailUploadHiddenInput
      id={id}
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onChangeImage}
      aria-label="썸네일 이미지 선택"
      title="이미지 파일을 선택하세요"
    />
  );

  return (
    <S.ThumbnailUploadContainer $isLoading={isLoading}>
      {image && (
        <IconButton
          onClick={onDeleteButton}
          iconType="x-icon"
          size="10"
          color={PRIMITIVE_COLORS.white}
          css={S.uploadDeleteButtonStyle}
        />
      )}

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
          {isLoading && (
            <S.ThumbnailUploadLoadingContainer>
              <Spinner variants="circle" size={60} />
            </S.ThumbnailUploadLoadingContainer>
          )}
          <S.ThumbnailUploadImage
            src={image}
            onLoad={handleImageLoad}
            alt="썸네일 이미지"
            style={{ display: isLoading ? "none" : "block" }}
          />
          {HiddenInput}
        </S.ThumbnailUploadEditButtonContainer>
      )}
    </S.ThumbnailUploadContainer>
  );
};

export default ThumbnailUpload;
