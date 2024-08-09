import { useRef } from "react";

import { css } from "@emotion/react";

import { MutateOptions } from "@tanstack/react-query";

import { MultiImageUpload } from "@components/common";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

const TravelogueMultiImageUpload = ({
  dayIndex,
  placeIndex,
  imageUrls,
  onRequestAddImage,
  onChangeImageUrls,
  onDeleteImageUrls,
}: {
  imageUrls: string[];
  dayIndex: number;
  placeIndex: number;
  onRequestAddImage: (
    variables: File[],
    options?: MutateOptions<string[], Error, File[], unknown> | undefined,
  ) => Promise<string[]>;
  onChangeImageUrls: (dayIndex: number, placeIndex: number, imgUrls: string[]) => void;
  onDeleteImageUrls: (dayIndex: number, targetPlaceIndex: number, imageIndex: number) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <MultiImageUpload
      previewUrls={imageUrls}
      fileInputRef={fileInputRef}
      onImageChange={async (e) => {
        const files = Array.from(e.target.files as FileList);

        if (imageUrls.length + files.length > 10) {
          alert(ERROR_MESSAGE_MAP.imageUpload);
          return;
        }

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
