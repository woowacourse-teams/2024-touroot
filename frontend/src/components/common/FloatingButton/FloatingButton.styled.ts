import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const FloatingButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  right: max(0vw + 2rem, calc(50vw - 22rem));
  bottom: 2rem;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};

  gap: ${({ theme }) => theme.spacing.s};
`;

export const SubButtonContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 15rem;
  padding: ${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.spacing.s};

  background-color: ${PRIMITIVE_COLORS.gray[700]};
  gap: ${({ theme }) => theme.spacing.l};

  transition: all 0.3s ease-out;

  ${({ $isOpen }) => css`
    opacity: ${$isOpen ? 1 : 0};
    transform: translateY(${$isOpen ? 0 : 2}rem);
    pointer-events: ${$isOpen ? "auto" : "none"};
  `}
`;

export const MainButtonWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  background-color: ${({ $isOpen, theme }) =>
    $isOpen ? PRIMITIVE_COLORS.gray[700] : theme.colors.primary};

  transition: transform 0.3s ease-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};

  cursor: pointer;
`;

export const subButtonTextStyle = css`
  color: ${PRIMITIVE_COLORS.white};
`;
