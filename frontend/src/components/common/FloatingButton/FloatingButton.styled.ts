// FloatingButton.styled.ts
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: max(2rem, calc(50% - 48rem / 2 + 2rem));
  bottom: 2rem;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
`;

export const ButtonGroup = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease-out;

  ${({ $isOpen }) => css`
    opacity: ${$isOpen ? 1 : 0};
    transform: translateY(${$isOpen ? 0 : 2}rem);
    pointer-events: ${$isOpen ? "auto" : "none"};
  `}
`;

const ButtonBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;

  color: ${PRIMITIVE_COLORS.white};
  transition: all 0.3s ease-out;
`;

export const Button = styled.button<{ $isPrimary: boolean; $index: number; $isOpen: boolean }>`
  ${ButtonBase}
  background-color: ${({ theme }) => theme.colors.border};

  ${({ $index, $isOpen }) => css`
    transition-delay: ${$isOpen ? $index * 0.1 : (2 - $index) * 0.1}s;
  `}
`;

export const MainButton = styled.button<{ $isPrimary: boolean; $isOpen: boolean }>`
  ${ButtonBase}
  background-color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.border : theme.colors.primary};
  transition: transform 0.3s ease-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
`;
