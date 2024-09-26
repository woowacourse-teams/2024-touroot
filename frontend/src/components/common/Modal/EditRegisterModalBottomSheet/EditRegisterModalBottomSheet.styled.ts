import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
  justify-content: center;
  align-items: center;
`;

export const HandleBar = styled.div`
  width: 5.4rem;
  height: 0.3rem;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.border};

  cursor: pointer;
`;

export const modalBodyStyle = css`
  gap: ${theme.spacing.m};
`;

export const subTextStyle = css`
  color: ${theme.colors.text.secondary};
`;
