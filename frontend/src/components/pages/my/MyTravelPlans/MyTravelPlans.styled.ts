import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.s};
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.s};
`;

export const iconButtonStyle = css`
  display: flex;
  gap: ${theme.spacing.s};
  padding: ${theme.spacing.m};
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  ${theme.typography.mobile.detail};
`;
