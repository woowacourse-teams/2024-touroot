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

export const Button = styled.button<{ $variants: ButtonProps["variants"] }>`
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
