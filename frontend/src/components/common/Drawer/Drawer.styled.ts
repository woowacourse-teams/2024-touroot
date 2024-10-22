import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Overlay = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.drawerOverlay};
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 30%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

export const DrawerContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  width: 210px;
  height: 100%;

  background-color: ${PRIMITIVE_COLORS.white};

  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
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
  background: none;
  border: none;

  font-size: 1.5rem;
  cursor: pointer;
`;

const slideIn = keyframes`
 from {
   transform: translateX(100%);
 }
 to {
   transform: translateX(0);
 }
`;

const slideOut = keyframes`
 from {
   transform: translateX(0);
 }
 to {
   transform: translateX(100%);
 }
`;
