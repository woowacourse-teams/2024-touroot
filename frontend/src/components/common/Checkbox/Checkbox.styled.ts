import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.label<{ $isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: ${({ theme, $isChecked }) => ($isChecked ? "none" : `1px solid ${theme.colors.border}`)};
  border-radius: 4px;

  background-color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.colors.primary : PRIMITIVE_COLORS.white};
`;

export const Checkbox = styled.input`
  display: none;
`;
