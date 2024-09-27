import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

const getButtonColorStyling = (isSelected: boolean) => {
  return css`
    border: 0.1rem solid ${isSelected ? PRIMITIVE_COLORS.blue[200] : theme.colors.border};

    background-color: ${isSelected ? PRIMITIVE_COLORS.blue[50] : PRIMITIVE_COLORS.white};

    color: ${isSelected ? theme.colors.primary : theme.colors.text.secondary};
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

export const Layout = styled.li<{ $isSelected: boolean; $index?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border-radius: 1rem;

  line-height: 1;

  ${({ $isSelected }) => getButtonColorStyling($isSelected)}

  animation: ${fadeInMove} 0.3s ease-out both;
  animation-delay: ${({ $index }) => `${($index ?? 0) * 50}ms`};
`;
