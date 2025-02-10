import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 48rem;
  padding: ${theme.spacing.m};
  gap: ${theme.spacing.xxl};
`;

export const largeText = css`
  font-size: 1.4rem;
`;

export const titleStyle = css`
  text-align: center;
  word-break: keep-all;
`;

export const subtitleStyle = css`
  margin-bottom: ${theme.spacing.xxl};

  text-align: center;
`;
