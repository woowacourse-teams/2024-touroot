import React, { useRef, useState } from "react";

import { css } from "@emotion/react";

import { MutateOptions } from "@tanstack/react-query";

import { MultiImageUpload } from "@components/common";
import { MAX_IMAGE_UPLOAD_COUNT } from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/TravelogueMultiImageUpload.constants";

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

  const handleClickButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    if (imageStates.length + files.length > MAX_IMAGE_UPLOAD_COUNT) {
      alert(ERROR_MESSAGE_MAP.imageUpload);
      return;
    }

    const newImageStates = files.map(() => ({ url: "", isLoading: true }));
    setImageStates((prevStates) => [...prevStates, ...newImageStates]);

    try {
      const newImageUrls = await onRequestAddImage(files);

      setImageStates((prevStates) => {
        const updatedStates = [...prevStates];
        const startIndex = updatedStates.findIndex((state) => state.isLoading);
        newImageUrls.forEach((url, index) => {
          if (startIndex + index < updatedStates.length) {
            updatedStates[startIndex + index] = { url, isLoading: false };
          }
        });
        return updatedStates;
      });

      const allImageUrls = [...imageUrls, ...newImageUrls];
      onChangeImageUrls(dayIndex, placeIndex, allImageUrls);
    } catch (error) {
      setImageStates((prevStates) => prevStates.slice(0, prevStates.length - files.length));
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
