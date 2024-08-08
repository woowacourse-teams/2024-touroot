import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { ToastStatus } from "@components/common/Toast/Toast.type";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  60% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutToTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const ToastContainerLayout = styled.div<{ $isOpen: boolean; $rect: DOMRect | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: ${({ $rect }) => ($rect?.top ?? 0) + ($rect?.height ?? 0)}px;
  left: ${({ $rect }) => $rect?.left}px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  width: ${({ $rect }) => $rect?.width}px;

  animation: ${({ $isOpen }) => ($isOpen ? slideInFromTop : slideOutToTop)} 0.5s ease-out;
  animation-fill-mode: forwards;
`;

const getToastBackgroundColor = ($status: ToastStatus) => {
  switch ($status) {
    case "error": {
      return css`
        background-color: ${theme.colors.danger};
      `;
    }
    case "success": {
      return css`
        background-color: ${PRIMITIVE_COLORS.green};
      `;
    }
    default:
      return;
  }
};

export const ToastLayout = styled.div<{ $status: ToastStatus }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: ${({ theme }) => theme.spacing.s};

  ${({ theme }) => theme.typography.mobile.detailBold}

  ${({ $status }) => getToastBackgroundColor($status)}
  box-shadow: 0 2px 4px rgb(0 0 0 / 25%);

  color: white;
`;
