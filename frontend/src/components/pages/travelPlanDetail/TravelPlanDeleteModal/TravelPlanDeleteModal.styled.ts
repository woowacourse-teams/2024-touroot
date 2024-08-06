import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m};
  justify-content: center;
  align-items: center;
`;

export const modalBodyStyle = css`
  gap: ${theme.spacing.m};
  padding: "2.6rem 0";
`;

export const mainTextStyle = css`
  font-weight: 700;
`;

export const subTextStyle = css`
  color: ${theme.colors.text.secondary};
`;
