import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import { ButtonColor } from "./Button";

export const Button = styled.button<{ $color: ButtonColor }>`
  width: 100%;
  height: 4rem;
  padding: 1.2rem auto;
  border-radius: 8px;
  border: 0.1rem solid
    ${({ $color, theme }) => ($color === "primary" ? theme.colors.primary : theme.colors.border)};

  ${({ theme }) => theme.typography.mobile.bodyBold}
  color: ${({ $color, theme }) =>
    $color === "primary" ? PRIMITIVE_COLORS.white : theme.colors.text.secondary};

  background-color: ${({ $color, theme }) =>
    $color === "primary" ? theme.colors.primary : PRIMITIVE_COLORS.white};
`;
