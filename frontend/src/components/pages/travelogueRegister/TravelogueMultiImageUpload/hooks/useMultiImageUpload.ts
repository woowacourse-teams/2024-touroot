import React, { useEffect, useRef, useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";

import { TravelogueMultiImageUploadProps } from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/TravelogueMultiImageUpload";
import { MAX_IMAGE_UPLOAD_COUNT } from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/TravelogueMultiImageUpload.constants";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

interface ImageState {
  url: string;
  isLoading: boolean;
}

export const useTravelogueMultiImageUpload = ({
  dayIndex,
  placeIndex,
  imageUrls,
  onChangeImageUrls,
  onDeleteImageUrls,
}: TravelogueMultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageStates, setImageStates] = useState<ImageState[]>(() =>
    imageUrls.map((url) => ({ url, isLoading: false })),
  );

  const { isPaused, mutateAsync: mutateAddImage } = usePostUploadImages();

  useEffect(() => {
    if (isPaused) {
      setImageStates((prevImageStates) =>
        prevImageStates.filter((prevImageState) => !prevImageState.isLoading),
      );
    }
  }, [isPaused]);

  const handleClickButton = () => {
    fileInputRef.current?.click();
  };

  const addLoadingImageStates = (files: File[]) => {
    const newImageStates = files.map(() => ({ url: "", isLoading: true }));
    setImageStates((prevStates) => [...prevStates, ...newImageStates]);
  };

  const updateImageStates = (newUrls: string[]) => {
    setImageStates((prevStates) => {
      const updatedStates = [...prevStates];
      const startIndex = updatedStates.findIndex((state) => state.isLoading);
      newUrls.forEach((url, index) => {
        updatedStates[startIndex + index] = { url, isLoading: false };
      });
      return updatedStates;
    });
  };

  const handleUploadSuccess = (newUrls: string[]) => {
    updateImageStates(newUrls);

    onChangeImageUrls(dayIndex, placeIndex, newUrls);
  };

  const revertImageStates = (failedCount: number) => {
    setImageStates((prevStates) => prevStates.slice(0, prevStates.length - failedCount));
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPaused) {
      alert(ERROR_MESSAGE_MAP.network);
      return;
    }

    const files = Array.from(e.target.files as FileList);

    if (imageStates.length + files.length > MAX_IMAGE_UPLOAD_COUNT) {
      alert(ERROR_MESSAGE_MAP.imageUpload);
      return;
    }

    try {
      addLoadingImageStates(files);

      const newImageUrls = await mutateAddImage({ files });
      handleUploadSuccess(newImageUrls);
    } catch {
      revertImageStates(files.length);
    } finally {
      resetFileInput();
    }
  };

  const handleDeleteImage = (imageIndex: number) => {
    setImageStates((prevStates) => prevStates.filter((_, index) => index !== imageIndex));
    onDeleteImageUrls(dayIndex, placeIndex, imageIndex);
  };

  return {
    imageStates,
    fileInputRef,
    handleChangeImage,
    handleDeleteImage,
    handleClickButton,
  };
};
