import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 0.8rem;
`;

export const TodoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const boxStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  padding: 1.2rem 1.6rem;
  gap: 0.4rem;
`;

export const textStyle = css`
  color: ${theme.colors.text.secondary};
`;

export const IconLinkWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const IconLink = styled.a`
  display: flex;

  padding: ${theme.spacing.s};
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
`;
