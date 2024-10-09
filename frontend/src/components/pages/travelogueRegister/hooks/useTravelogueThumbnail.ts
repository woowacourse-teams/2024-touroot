import { useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";

import resizeAndConvertImage from "@utils/resizeAndConvertImage";

const useTravelogueThumbnail = () => {
  const { mutateAsync: mutateAddImage } = usePostUploadImages();

  const [thumbnail, setThumbnail] = useState("");

  const onChangeThumbnail = async (files: FileList | null) => {
    try {
      const newFiles = Array.from(files as FileList);
      const processedFiles = await Promise.all(newFiles.map((file) => resizeAndConvertImage(file)));
      const thumbnail = await mutateAddImage(processedFiles);

      setThumbnail(thumbnail[0]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onResetThumbnail = () => setThumbnail("");

  return { thumbnail, onChangeThumbnail, onResetThumbnail };
};

export default useTravelogueThumbnail;
