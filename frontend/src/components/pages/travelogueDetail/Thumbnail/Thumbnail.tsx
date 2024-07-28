import { FallbackImage } from "@components/common";

import useImageError from "@hooks/useImageError";

import * as S from "./Thumbnail.styled";

interface ThumbnailProps extends React.HTMLAttributes<HTMLElement> {
  imageUrl?: string;
}

const Thumbnail = ({ imageUrl }: ThumbnailProps) => {
  const { imageError, handleImageError } = useImageError({ imageUrl });

  return (
    <S.Wrapper>
      {imageError ? <FallbackImage /> : <S.Image onError={handleImageError} src={imageUrl} />}
    </S.Wrapper>
  );
};

export default Thumbnail;
