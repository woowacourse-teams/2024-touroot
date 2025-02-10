import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const HandleBar = styled.div`
  width: 5.4rem;
  height: 0.3rem;
  border-radius: 0.4rem;

  background-color: ${({ theme }) => theme.colors.border};

  cursor: pointer;
`;

export const modalBodyStyle = css`
  align-items: flex-start;
  padding-bottom: ${theme.spacing.l};

  gap: ${theme.spacing.l};
`;
