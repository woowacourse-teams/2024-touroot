import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

import { ModalProps } from "./Modal";
import { GapSize } from "./Modal.type";

const createPositionStyling = ($position: Required<ModalProps>["position"], $currentY?: number) => {
  const styles = {
    center: css`
      width: calc(100% - ${SPACING.m} * 2);
      max-width: calc(48rem - ${SPACING.m} * 2);
      border-radius: ${SPACING.s};
    `,

    bottom: css`
      width: 100%;
      max-width: 48rem;
      border-radius: ${SPACING.s} ${SPACING.s} 0 0;

      transform: translateY(${$currentY}px);
      transition: transform 0.3s ease-out;
    `,
  };

  return styles[$position];
};

export const Layout = styled.section<{
  $position: Required<ModalProps>["position"];
  $isOpen: boolean;
}>`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  inset: 0;

  ${({ $position }) => css`
    align-items: ${$position === "center" ? "center" : "flex-end"};
    ${$position === "bottom" && "transition: all 0.3s ease-out"};
  `};

  ${({ $isOpen }) => css`
    opacity: ${$isOpen ? 1 : 0};
    visibility: ${$isOpen ? "visible" : "hidden"};
  `}
`;

export const BackdropLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.dimmed};
  cursor: pointer;
`;

export const ModalBoxLayout = styled.div<{
  $position: Required<ModalProps>["position"];
  $currentY?: number;
  $gap: GapSize;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};

  max-height: 80vh;
  padding: ${({ theme }) => theme.spacing.m};
  ${({ $position, $currentY }) => createPositionStyling($position, $currentY)}

  background-color: ${PRIMITIVE_COLORS.white};
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
`;
