import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

const getButtonColorStyling = (isSelected: boolean) => {
  if (isSelected) {
    return css`
      border: 0.1rem solid ${PRIMITIVE_COLORS.blue[200]};

      background-color: ${PRIMITIVE_COLORS.blue[50]};

      color: ${theme.colors.primary};
    `;
  } else {
    return css`
      border: 0.1rem solid ${theme.colors.border};

      background-color: ${PRIMITIVE_COLORS.white};

      color: ${theme.colors.text.secondary};
    `;
  }
};

export const Chip = styled.li<{ $isSelected: boolean }>`
  padding: 0.8rem 1.6rem;
  border-radius: 1rem;

  ${({ $isSelected }) => getButtonColorStyling($isSelected)};
`;
