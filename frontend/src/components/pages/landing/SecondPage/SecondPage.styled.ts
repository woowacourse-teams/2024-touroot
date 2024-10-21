import { css, keyframes } from "@emotion/react";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import { fadeIn } from "../Animation.styled";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 48rem;
  padding: ${theme.spacing.l};
  gap: ${theme.spacing.xxl};

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${theme.spacing.xl};
`;

export const boxContainer = css`
  display: flex;
  position: relative;
`;

export const emojiText = css`
  position: absolute;
  right: -4rem;
  bottom: -2rem;

  font-size: 4rem;
`;

export const relativeBox = css`
  position: relative;
  width: 80%;
`;

export const absoluteEmojiText = css`
  position: absolute;
  bottom: 0.4rem;
  left: 0;

  font-size: 4rem;
`;

export const section = css`
  position: relative;
`;

export const textContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: ${theme.spacing.s};
`;

export const mainImage = css`
  width: 100%;
`;

export const bottomBox = css`
  justify-content: center;
  gap: ${theme.spacing.m};
`;

export const bottomTextContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const centeredTextContainer = css`
  display: flex;
  justify-content: center;
`;

export const fontWeightMedium = css`
  font-weight: 500;
`;

export const emojiStyle = css`
  position: absolute;
  top: 5%;
  left: 30%;
  transform: translateY(50%);
  transform: translateX(-50%);
  z-index: 10;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-1rem); }
  100% { transform: translateY(0px); }
`;

export const buttonStyle = css`
  position: absolute;
  top: -5.8rem;
  z-index: ${theme.zIndex.toast};
  padding: ${theme.spacing.m};
  opacity: 0.5;

  background-color: transparent;

  animation: ${float} 1s ease-in-out infinite;
`;

export const primaryText = css`
  color: ${theme.colors.primary};
`;

export const createAnimatedSectionStyle = ({
  isVisible,
  delay,
}: {
  isVisible: boolean;
  delay?: number;
}) => css`
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;

  ${isVisible &&
  css`
    animation: ${fadeIn} 0.5s ease-out forwards;
  `}

  ${delay &&
  css`
    animation-delay: ${delay}ms;
  `};
`;

export const widthEightyPercent = css`
  min-width: 80%;
`;

export const widthFull = css`
  width: 100%;
`;

export const textAlignRight = css`
  text-align: right;
`;
