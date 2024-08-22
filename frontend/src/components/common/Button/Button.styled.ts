import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

import type { ButtonProps } from "./Button";

const createVariantStyling = ($variants: Required<ButtonProps>["variants"]) => {
  const styles = {
    primary: css`
      background-color: ${theme.colors.primary};

      color: ${PRIMITIVE_COLORS.white};
    `,

    secondary: css`
      border: 0.1rem solid ${theme.colors.border};

      background-color: ${PRIMITIVE_COLORS.white};

      color: ${theme.colors.text.secondary};
    `,
  };

  return styles[$variants];
};

const createPositionStyling = ($position: Required<ButtonProps>["position"]) => {
  const styles = {
    left: css`
      justify-content: flex-start;
    `,

    center: css`
      justify-content: center;
    `,

    right: css`
      justify-content: flex-end;
    `,
  };

  return styles[$position];
};

export const Button = styled.button<{
  $variants: ButtonProps["variants"];
  $position: ButtonProps["position"];
}>`
  display: flex;
  justify-content: ${({ $position = "center" }) => createPositionStyling($position)};
  align-items: center;

  width: 100%;
  height: 4rem;
  border: none;
  ${({ theme }) => theme.typography.mobile.bodyBold}
  ${({ $variants = "primary" }) => createVariantStyling($variants)}
  border-radius: ${({ theme }) => theme.spacing.s};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
