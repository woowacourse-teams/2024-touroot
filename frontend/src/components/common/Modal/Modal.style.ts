import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

import { ModalProps } from "./Modal";

const createPositionStyling = ($position: Required<ModalProps>["position"]) => {
  const styles = {
    center: css`
      width: calc(100% - ${SPACING.m} * 2);
      max-width: calc(48rem - ${SPACING.m} * 2);
    `,

    bottom: css`
      width: 100%;
      max-width: 48rem;
    `,
  };

  return styles[$position];
};

export const Layout = styled.section<{ $position: Required<ModalProps>["position"] }>`
  display: flex;
  justify-content: center;
  align-items: ${({ $position }) => ($position === "center" ? "center" : "flex-end")};
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const BackdropLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.dimmed};
  cursor: pointer;
`;

export const ModalBoxLayout = styled.div<{ $position: Required<ModalProps>["position"] }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  max-height: 80vh;
  ${({ $position }) => createPositionStyling($position)}
  border-radius: ${({ theme }) => theme.spacing.s};

  background-color: ${PRIMITIVE_COLORS.white};
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
`;
