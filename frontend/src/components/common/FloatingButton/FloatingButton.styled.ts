import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
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

export const BackdropLayout = styled.div<{ $isOpen: boolean }>`
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  position: fixed;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.dimmed};

  animation: ${({ $isOpen, theme }) =>
      $isOpen ? theme.animation.fade.in : theme.animation.fade.out}
    ${theme.animation.duration.default} ease-in-out;
  inset: 0;
  cursor: pointer;
`;

export const SubButtonContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  position: absolute;
  bottom: 100%;

  width: 16rem;
  padding: ${({ theme }) => theme.spacing.l} ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.spacing.s};

  background-color: ${PRIMITIVE_COLORS.gray[700]};

  animation: ${({ $isOpen, theme }) =>
      $isOpen
        ? theme.animation.slide.up({ from: 2, to: -0.8 })
        : theme.animation.slide.down({ from: -0.8, to: 2 })}
    ${theme.animation.duration.default} ease-in-out;
  gap: ${({ theme }) => theme.spacing.l};
  animation-fill-mode: forwards;
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
