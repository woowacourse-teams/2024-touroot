import { css } from "@emotion/react";

import { MutateOptions } from "@tanstack/react-query";

import { MultiImageUpload } from "@components/common";

import { useImageUpload } from "@hooks/useImageUpload";

const TravelogueMultiImageUpload = ({
  dayIndex,
  placeIndex,
  onRequestAddImage,
  onChangeImageUrls,
  onDeleteImageUrls,
}: {
  dayIndex: number;
  placeIndex: number;
  onRequestAddImage: (
    variables: File[],
    options?: MutateOptions<string[], Error, File[], unknown> | undefined,
  ) => Promise<string[]>;
  onChangeImageUrls: (dayIndex: number, placeIndex: number, imgUrls: string[]) => void;
  onDeleteImageUrls: (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => void;
}) => {
  const { previewUrls, fileInputRef, handleImageChange, handleDeleteImage, handleButtonClick } =
    useImageUpload({
      multiple: true,
      maxCount: 10,
    });
  return (
    <MultiImageUpload
      previewUrls={previewUrls}
      fileInputRef={fileInputRef}
      onImageChange={async (e) => {
        handleImageChange(e);
        const imgUrls = await onRequestAddImage(Array.from(e.target.files as FileList));
        onChangeImageUrls(dayIndex, placeIndex, imgUrls);
      }}
      onDeleteImage={(imageIndex) => {
        handleDeleteImage(imageIndex);
        onDeleteImageUrls(dayIndex, placeIndex, imageIndex);
      }}
      onButtonClick={handleButtonClick}
      css={css`
        margin-bottom: 1.6rem;
      `}
    />
  );
};

export default TravelogueMultiImageUpload;
