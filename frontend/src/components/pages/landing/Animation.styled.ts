import { css, keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ANIMATION_MAP = {
  fadeIn: fadeIn,
};

export const createAnimation = ({
  shouldAnimate,
  animation,
  delay = 300,
}: {
  shouldAnimate: boolean;
  animation: keyof typeof ANIMATION_MAP;
  delay?: number;
}) => css`
  opacity: 0;

  animation: ${shouldAnimate ? ANIMATION_MAP[animation] : "none"} 0.5s ease-in-out ${delay}ms
    forwards;
`;
