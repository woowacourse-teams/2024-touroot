import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { SpinnerVariants } from "@components/common/Spinner/Spinner.type";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const createSpinnerVariants = ($variants: SpinnerVariants, $size: number) => {
  return {
    tturi: css`
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: ${$size / 10}rem;
        height: ${$size / 10}rem;

        animation: ${rotate} 0.5s linear infinite;
      }
    `,
    circle: css`
      width: ${$size / 10}rem;
      height: ${$size / 10}rem;
      border: ${$size / 130}rem solid ${theme.colors.border};
      border-top: ${$size / 130}rem solid ${PRIMITIVE_COLORS.blue[500]};
      border-radius: 50%;

      animation: ${rotate} 1s linear infinite;
    `,
  }[$variants];
};

export const LoadingSpinner = styled.div<{ $variants: SpinnerVariants; $size: number }>`
  ${({ $variants, $size }) => createSpinnerVariants($variants, $size)}
`;
