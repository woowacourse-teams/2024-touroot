import styled from "@emotion/styled";

import { AvatarCircleSize } from "./AvatarCircle";

const getSize = ($size: AvatarCircleSize) => {
  return $size === "small" ? "2.2rem" : "12.9rem";
};

const getIconSize = ($size: AvatarCircleSize) => {
  return $size === "small" ? "1.5rem" : "10rem";
};

export const FallbackIcon = styled.div<{ $size: AvatarCircleSize }>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;

  background-color: #d9d9d9;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    bottom: 0;
    width: ${({ $size }) => getIconSize($size)};
    height: ${({ $size }) => getIconSize($size)};
  }
`;

export const AvatarCircleContainer = styled.div<{ $size: AvatarCircleSize }>`
  overflow: hidden;
  width: ${({ $size }) => getSize($size)};
  height: ${({ $size }) => getSize($size)};
  border-radius: 50%;
  object-fit: cover;
  object-position: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
