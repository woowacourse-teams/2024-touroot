import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 1.6rem 6.4rem;
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
