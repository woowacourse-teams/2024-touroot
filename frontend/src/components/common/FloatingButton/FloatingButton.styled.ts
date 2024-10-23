import { css, keyframes } from "@emotion/react";
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

const fadeIn = keyframes`
from {
  opacity:0;
  visibility: hidden;
}
to {
  opacity:1;
  visibility: visible;
}
`;

const fadeOut = keyframes`
from {
  opacity:1;
  visibility: visible;
}
to {
  opacity:0;
  visibility: hidden;
}
`;

export const BackdropLayout = styled.div<{ $isOpen: boolean }>`
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  position: fixed;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.dimmed};

  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
  inset: 0;
  cursor: pointer;
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
    visibility: hidden;
  }
  to {
    opacity: 1;
    transform: translateY(-0.8rem);
    visibility: visible;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(-0.8rem);
    visibility: visible;
  }
  to {
    opacity: 0;
    transform: translateY(2rem);
    visibility: hidden;
  }
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

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-in-out;
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
