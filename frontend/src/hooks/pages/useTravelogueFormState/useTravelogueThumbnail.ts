import { useCallback, useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";

import resizeAndConvertImage from "@utils/resizeAndConvertImage";
import { validateThumbnail } from "@utils/validate";

const useTravelogueThumbnail = () => {
  const { mutateAsync: mutateAddImage } = usePostUploadImages();

  const [thumbnail, setThumbnail] = useState("");

  const handleChangeThumbnail = async (files: FileList | null) => {
    try {
      if (files) {
        const file = files[0];
        const validationError = validateThumbnail(file);

        if (validationError) throw new Error(validationError);
      }

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

  const handleInitializeThumbnail = useCallback((thumbnailUrl: string) => {
    setThumbnail(thumbnailUrl);
  }, []);

  const handleResetThumbnail = () => {
    setThumbnail("");
  };

  return {
    thumbnail,
    handleChangeThumbnail,
    handleResetThumbnail,
    handleInitializeThumbnail,
  };
};

export default useTravelogueThumbnail;
