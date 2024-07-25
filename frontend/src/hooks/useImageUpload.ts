import { ChangeEvent, useRef, useState } from "react";

interface UseImageUploadProps {
  multiple?: boolean;
  maxCount?: number;
}

export const useImageUpload = ({ multiple = false, maxCount = 10 }: UseImageUploadProps = {}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));

      if (multiple) {
        setPreviewUrls((previewUrls) => {
          const updatedImages = [...previewUrls, ...newImages];
          return updatedImages.slice(0, maxCount);
        });
      } else {
        setPreviewUrls([newImages[0]]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviewUrls((previewUrls) => previewUrls.filter((_, i) => i !== index));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    previewUrls,
    fileInputRef,
    handleImageChange,
    handleDeleteImage,
    handleButtonClick,
  };
};
