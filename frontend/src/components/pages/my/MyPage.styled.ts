import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.l};
`;

export const BoxButton = styled.button`
  display: flex;
  gap: ${(props) => props.theme.spacing.m};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing.m};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 10px;
`;

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;

export const ColorButtonStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 6.8rem;
  padding: ${theme.spacing.m};
  border-radius: 10px;

  background-color: ${PRIMITIVE_COLORS.blue[50]};
  gap: ${theme.spacing.m};
`;

export const ListStyle = css`
  li {
    ${theme.typography.mobile.body};
    font-weight: 700;
  }
`;
