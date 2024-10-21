import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 48rem;
  padding: ${theme.spacing.l} ${theme.spacing.l} 0 ${theme.spacing.l};

  background-color: ${PRIMITIVE_COLORS.blue[50]};
`;
export const Image = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 0;
  width: 100%;
`;
export const titleStyle = css`
  margin-top: ${theme.spacing.xxl};

  color: ${theme.colors.primary};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.l};
`;
export const buttonStyle = css`
  background-color: ${PRIMITIVE_COLORS.white};

  color: ${theme.colors.primary};

  box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.colors.primary};

    color: ${PRIMITIVE_COLORS.white};
  }
`;
export const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 20rem;
  background: linear-gradient(to bottom, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 50%) 100%);
`;
