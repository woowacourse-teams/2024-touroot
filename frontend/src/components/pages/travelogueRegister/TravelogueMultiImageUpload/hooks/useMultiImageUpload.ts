import React, { useRef, useState } from "react";

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
  onRequestAddImage,
  onChangeImageUrls,
  onDeleteImageUrls,
}: TravelogueMultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageStates, setImageStates] = useState<ImageState[]>(() =>
    imageUrls.map((url) => ({ url, isLoading: false })),
  );

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
    const allImageUrls = [...imageUrls, ...newUrls];
    onChangeImageUrls(dayIndex, placeIndex, allImageUrls);
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
    const files = Array.from(e.target.files as FileList);

    if (imageStates.length + files.length > MAX_IMAGE_UPLOAD_COUNT) {
      alert(ERROR_MESSAGE_MAP.imageUpload);
      return;
    }

    addLoadingImageStates(files);

    try {
      const newImageUrls = await onRequestAddImage(files);
      handleUploadSuccess(newImageUrls);
    } catch (error) {
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