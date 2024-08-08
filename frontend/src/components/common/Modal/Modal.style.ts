import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const ModalBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: calc(100% - ${({ theme }) => theme.spacing.m} * 2);
  max-height: 80vh;
  max-width: calc(48rem - ${({ theme }) => theme.spacing.m} * 2);
  margin: ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.spacing.s};

  background-color: ${PRIMITIVE_COLORS.white};
  box-shadow: 0 0 5px rgb(0 0 0 / 15%);
`;
