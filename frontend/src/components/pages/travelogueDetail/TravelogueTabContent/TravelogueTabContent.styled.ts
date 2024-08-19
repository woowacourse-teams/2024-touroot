import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.2rem 0;
  padding: 0 1.6rem;
  gap: 0.8rem;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.mobile.subTitle}
  margin-left: 1.6rem;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const IconButtonStyle = css`
  padding: ${theme.spacing.s};
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
`;
