import { css, keyframes } from "@emotion/react";
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
  }
  return css`
    border: 0.1rem solid ${theme.colors.border};

    background-color: ${PRIMITIVE_COLORS.white};

    color: ${theme.colors.text.secondary};
  `;
};

const fadeInMove = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Chip = styled.li<{ $isSelected: boolean; $index?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border-radius: 1rem;

  line-height: 1;

  ${({ $isSelected }) => getButtonColorStyling($isSelected)}

  animation: ${fadeInMove} 0.3s ease-out both;
  ${({ $index }) => ($index ? `animation-delay: ${$index * 50}ms` : "")};
`;
