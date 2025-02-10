import styled from "@emotion/styled";

import type { AvatarCircleSize } from "./AvatarCircle.type";

const getSize = ($size: AvatarCircleSize) => {
  if ($size === "small") return "2.2rem";
  if ($size === "medium") return "6rem";
  if ($size === "large") return "12.9rem";
};

const getIconSize = ($size: AvatarCircleSize) => {
  if ($size === "small") return "1.5rem";
  if ($size === "medium") return "5rem";
  if ($size === "large") return "10rem";
};

export const FallbackIcon = styled.div<{ $size: AvatarCircleSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  background-color: #d9d9d9;

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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
