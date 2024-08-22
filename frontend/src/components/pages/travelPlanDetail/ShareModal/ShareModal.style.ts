import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const ShareInputContainer = styled.div`
  position: relative;
  width: 29rem;
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;

export const TTuriImg = styled.img`
  width: 11rem;
  height: 12.5rem;
`;

export const shareModalBodyStyle = css`
  gap: ${theme.spacing.m};
`;

export const textBoldStyle = css`
  font-weight: 700;
`;

export const notOutlineStyle = css`
  width: 100%;
  padding-right: 6.2rem;

  overflow-x: scroll;
`;

export const copyUrlButtonStyle = css`
  position: absolute;
  top: ${theme.spacing.s};
  right: ${theme.spacing.m};

  width: 4rem;
  height: 2.4rem;

  font-size: 1.2rem;
`;
