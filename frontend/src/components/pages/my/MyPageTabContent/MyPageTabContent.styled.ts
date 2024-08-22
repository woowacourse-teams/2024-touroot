import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Container = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.s};
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const List = styled.ul`
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
