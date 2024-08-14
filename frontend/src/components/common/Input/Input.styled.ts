import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

import type { InputVariants } from "./Input.type";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Input = styled.input<{ variant: InputVariants }>`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: 8px;

  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.primary};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};

    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ${({ variant }) => {
    if (variant === "round") return roundStyle;
    if (variant === "bottom") return bottomStyle;
    if (variant === "none") return noneStyle;
  }}
`;
export const roundStyle = css`
  border: 0.1rem solid ${theme.colors.border};

  &:focus {
    border-color: ${theme.colors.border};
    outline: none;
  }
`;

export const bottomStyle = css`
  border: none;
  border-bottom: 1px solid ${theme.colors.border};
  border-radius: 0;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

export const noneStyle = css`
  border: none;
  border-radius: 0;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }
`;
