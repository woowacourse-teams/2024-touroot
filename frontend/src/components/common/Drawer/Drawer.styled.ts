import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Overlay = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.drawerOverlay};
  width: 100%;
  height: 100%;
  inset: 0;

  background-color: rgb(0 0 0 / 30%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  animation: ${({ isOpen, theme }) => (isOpen ? theme.animation.fade.in : theme.animation.fade.out)}
    ${theme.animation.duration.default} ease-in-out;
`;

export const DrawerContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  width: 210px;
  height: 100%;

  background-color: ${PRIMITIVE_COLORS.white};

  animation: ${({ isOpen, theme }) =>
      isOpen
        ? theme.animation.slide.in({ from: "100%", to: 0 })
        : theme.animation.slide.out({ from: 0, to: "100%" })}
    ${theme.animation.duration.default} ease-in-out;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  padding: ${({ theme }) => theme.spacing.m};
  border-bottom: 1px solid #e0e0e0;
`;

export const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.m};
`;

export const TriggerButton = styled.button`
  border: none;

  background-color: none;

  font-size: 1.5rem;

  cursor: pointer;
`;
