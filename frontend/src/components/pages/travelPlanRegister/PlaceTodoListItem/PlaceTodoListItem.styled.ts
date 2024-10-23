import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const Layout = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0.1rem;
`;

export const ToDoListItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const errorInputStyle = css`
  border-bottom: 1px solid ${theme.colors.danger};
`;
