import { css } from "@emotion/react";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 48rem;
  padding: ${theme.spacing.l} ${theme.spacing.l} 0 ${theme.spacing.l};
  gap: ${theme.spacing.m};

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const section = css`
  display: flex;
  position: relative;
  width: 100%;
`;

export const sectionLeft = css`
  ${section}
  justify-content: flex-start;
`;

export const sectionRight = css`
  ${section}
  justify-content: flex-end;
`;

export const image = css`
  width: 80%;
`;

export const boxRight = css`
  position: absolute;
  right: 0;
  bottom: 30%;
  transform: translateY(50%);
  padding: ${theme.spacing.m};
`;

export const boxLeft = css`
  position: absolute;
  bottom: 30%;
  left: 0;
  padding: ${theme.spacing.m};
  transform: translateY(50%);
`;
