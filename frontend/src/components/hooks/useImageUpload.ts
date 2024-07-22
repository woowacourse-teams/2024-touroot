import { ChangeEvent, useRef, useState } from "react";

interface UseImageUploadProps {
  multiple?: boolean;
  maxCount?: number;
}

export const useImageUpload = ({ multiple = false, maxCount = 10 }: UseImageUploadProps = {}) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));

      if (multiple) {
        setImages((prevImages) => {
          const updatedImages = [...prevImages, ...newImages];
          return updatedImages.slice(0, maxCount);
        });
      } else {
        setImages([newImages[0]]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    images,
    fileInputRef,
    handleImageChange,
    handleDeleteImage,
    handleButtonClick,
  };
};
