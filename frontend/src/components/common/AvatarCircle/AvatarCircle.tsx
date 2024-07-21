import { useState } from "react";

// import { DefaultAvatar } from "@assets/svg";
import * as S from "./AvatarCircle.styled";

export type AvatarCircleSize = "small" | "large";

interface AvatarCircleProps {
  $size?: AvatarCircleSize;
  userAvatar: string;
}

const AvatarCircle = ({ $size = "small", userAvatar }: AvatarCircleProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <S.AvatarCircleContainer $size={$size}>
      {!imageError ? (
        <img src={userAvatar} alt="사용자 프로필 이미지" onError={handleImageError} />
      ) : (
        <S.FallbackIcon $size={$size}>
          {/* TODO: react component import로 수정할 것*/}
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5.5" cy="2.5" r="2.5" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.9552 11H0C0.252614 8.19675 2.60856 6 5.47758 6C8.3466 6 10.7025 8.19675 10.9552 11Z"
              fill="white"
            />
          </svg>
        </S.FallbackIcon>
      )}
    </S.AvatarCircleContainer>
  );
};

export default AvatarCircle;
