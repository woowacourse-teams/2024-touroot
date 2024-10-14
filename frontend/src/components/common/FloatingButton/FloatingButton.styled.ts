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
  z-index: ${({ theme }) => theme.zIndex.floating};
`;

export const BackdropLayout = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;

  background-color: ${({ theme }) => theme.colors.dimmed};
  cursor: pointer;
`;

export const SubButtonContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  gap: ${({ theme }) => theme.spacing.l};

  width: 16rem;
  padding: ${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.spacing.s};

  background-color: ${PRIMITIVE_COLORS.gray[700]};

  transition: all 0.3s ease-out;

  ${({ $isOpen }) => css`
    opacity: ${$isOpen ? 1 : 0};
    visibility: ${$isOpen ? "visible" : "hidden"};
    transform: translateY(${$isOpen ? -0.8 : 2}rem);
  `}
`;

export const SubButton = styled.button`
  display: flex;
  justify-content: flex-start;

  width: 100%;
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

export const visualHiddenStyle = css`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;

  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;
