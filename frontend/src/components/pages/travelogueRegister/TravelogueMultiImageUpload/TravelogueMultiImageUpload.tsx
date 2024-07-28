import { css } from "@emotion/react";

import { MutateOptions } from "@tanstack/react-query";

import { MultiImageUpload } from "@components/common";

import { useImageUpload } from "@hooks/useImageUpload";

const TravelogueMultiImageUpload = ({
  dayIndex,
  placeIndex,
  imageUrls,
  onRequestAddImage,
  onChangeImageUrls,
  onDeleteImageUrls,
}: {
  imageUrls: { url: string }[];
  dayIndex: number;
  placeIndex: number;
  onRequestAddImage: (
    variables: File[],
    options?: MutateOptions<string[], Error, File[], unknown> | undefined,
  ) => Promise<string[]>;
  onChangeImageUrls: (dayIndex: number, placeIndex: number, imgUrls: string[]) => void;
  onDeleteImageUrls: (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => void;
}) => {
  const { fileInputRef, handleButtonClick } = useImageUpload({
    multiple: true,
    maxCount: 10,
  });

  return (
    <MultiImageUpload
      previewUrls={imageUrls.map(({ url }) => url)}
      fileInputRef={fileInputRef}
      onImageChange={async (e) => {
        const files = Array.from(e.target.files as FileList);
        const imgUrls = await onRequestAddImage(files);
        onChangeImageUrls(dayIndex, placeIndex, imgUrls);
      }}
      onDeleteImage={(imageIndex) => {
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
