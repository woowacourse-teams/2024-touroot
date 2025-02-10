import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.bottomSheet};
  gap: ${({ theme }) => theme.spacing.s};

  width: 100%;
  max-width: 48rem;
  padding: ${({ theme }) => theme.spacing.m};

  background-color: ${PRIMITIVE_COLORS.white};

  box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m};

  width: 100%;
`;
