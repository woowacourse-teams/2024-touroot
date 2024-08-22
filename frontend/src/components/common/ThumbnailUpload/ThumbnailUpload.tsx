import { InputHTMLAttributes, useState } from "react";

import { PictureIcon } from "@assets/svg";

import Spinner from "../Spinner/Spinner";
import * as S from "./ThumbnailUpload.styled";

interface ThumbnailUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  previewUrls: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
}

const ThumbnailUpload = ({
  id,
  previewUrls,
  fileInputRef,
  onChangeImage,
  onClickButton,
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
