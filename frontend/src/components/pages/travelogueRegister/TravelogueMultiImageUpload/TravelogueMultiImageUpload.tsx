import React, { useRef, useState } from "react";

import { css } from "@emotion/react";

import { MutateOptions } from "@tanstack/react-query";

import { MultiImageUpload } from "@components/common";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

interface ImageState {
  url: string;
  isLoading: boolean;
}

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
  const [imageStates, setImageStates] = useState<ImageState[]>(
    imageUrls.map((url) => ({ url, isLoading: false })),
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    if (imageStates.length + files.length > 10) {
      alert(ERROR_MESSAGE_MAP.imageUpload);
      return;
    }

    const newImageStates = files.map(() => ({ url: "", isLoading: true }));
    setImageStates((prevStates) => [...prevStates, ...newImageStates]);

    try {
      const newImgUrls = await onRequestAddImage(files);

      setImageStates((prevStates) => {
        const updatedStates = [...prevStates];
        const startIndex = updatedStates.findIndex((state) => state.isLoading);
        newImgUrls.forEach((url, index) => {
          if (startIndex + index < updatedStates.length) {
            updatedStates[startIndex + index] = { url, isLoading: false };
          }
        });
        return updatedStates;
      });

      const allImageUrls = [...imageUrls, ...newImgUrls];
      onChangeImageUrls(dayIndex, placeIndex, allImageUrls);
    } catch (error) {
      setImageStates((prevStates) => prevStates.slice(0, prevStates.length - files.length));
    }
  };

  const handleDeleteImage = (imageIndex: number) => {
    setImageStates((prevStates) => prevStates.filter((_, index) => index !== imageIndex));
    onDeleteImageUrls(dayIndex, placeIndex, imageIndex);
  };

  return (
    <MultiImageUpload
      previewImageStates={imageStates}
      fileInputRef={fileInputRef}
      onImageChange={handleImageChange}
      onDeleteImage={handleDeleteImage}
      onButtonClick={handleButtonClick}
      css={css`
        margin-bottom: 1.6rem;
      `}
    />
  );
};

export default TravelogueMultiImageUpload;
