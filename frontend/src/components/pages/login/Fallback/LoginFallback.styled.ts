import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const subTextStyle = css`
  color: ${theme.colors.text.secondary};
`;
