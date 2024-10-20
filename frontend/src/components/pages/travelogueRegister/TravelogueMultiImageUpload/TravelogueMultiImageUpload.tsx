import { css } from "@emotion/react";

import { MultiImageUpload } from "@components/common";
import { useTravelogueMultiImageUpload } from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/hooks/useMultiImageUpload";

export interface TravelogueMultiImageUploadProps {
  imageUrls: string[];
  dayIndex: number;
  placeIndex: number;
  onChangeImageUrls: (dayIndex: number, placeIndex: number, imgUrls: string[]) => void;
  onDeleteImageUrls: (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => void;
}

const TravelogueMultiImageUpload = ({
  dayIndex,
  placeIndex,
  imageUrls,
  onChangeImageUrls,
  onDeleteImageUrls,
}: TravelogueMultiImageUploadProps) => {
  const { imageStates, fileInputRef, handleChangeImage, handleClickButton, handleDeleteImage } =
    useTravelogueMultiImageUpload({
      imageUrls,
      dayIndex,
      placeIndex,
      onChangeImageUrls,
      onDeleteImageUrls,
    });

  return (
    <MultiImageUpload
      previewImageStates={imageStates}
      fileInputRef={fileInputRef}
      onImageChange={handleChangeImage}
      onDeleteImage={handleDeleteImage}
      onButtonClick={handleClickButton}
      css={css`
        margin-bottom: 1.6rem;
      `}
    />
  );
};

export default TravelogueMultiImageUpload;
