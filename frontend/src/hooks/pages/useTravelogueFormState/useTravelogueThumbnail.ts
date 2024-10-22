import { useCallback, useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";

const useTravelogueThumbnail = () => {
  const { mutateAsync: mutateAddImage } = usePostUploadImages();

  const [thumbnail, setThumbnail] = useState("");

  const handleChangeThumbnail = async (files: FileList | null) => {
    const newFiles = Array.from(files as FileList);
    const thumbnail = await mutateAddImage({ files: newFiles });

    setThumbnail(thumbnail[0]);
  };

  const handleInitializeThumbnail = useCallback((thumbnailUrl: string) => {
    setThumbnail(thumbnailUrl);
  }, []);

  const handleResetThumbnail = () => setThumbnail("");

  return { thumbnail, handleChangeThumbnail, handleResetThumbnail, handleInitializeThumbnail };
};

export default useTravelogueThumbnail;
