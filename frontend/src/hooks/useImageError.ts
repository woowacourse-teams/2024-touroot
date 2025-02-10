import { useEffect, useState } from "react";

const useImageError = ({ imageUrl }: { imageUrl?: string }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }, [imageUrl]);

  const handleImageError = () => {
    setImageError(true);
  };

  return { imageError, handleImageError };
};

export default useImageError;
