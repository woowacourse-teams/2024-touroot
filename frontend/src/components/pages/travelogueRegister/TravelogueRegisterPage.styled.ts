import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

export const addButtonStyle = css`
  display: flex;
  width: 100%;
  height: 4rem;
  margin-bottom: 3.2rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${SPACING.s};

  color: ${PRIMITIVE_COLORS.black};
  font-weight: 700;
  font-size: 1.6rem;
  gap: ${SPACING.s};
`;

export const addTravelAddButtonStyle = css`
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${SPACING.s};

  color: ${PRIMITIVE_COLORS.black};
  font-weight: 700;
  font-size: 1.6rem;
  gap: ${SPACING.s};
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 3.2rem;
`;

export const AccordionRootContainer = styled.div`
  & > * {
    margin-bottom: 1.6rem;
  }
`;

export const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 5.6rem;
`;

export const addDayButtonStyle = css`
  margin-top: 1.6rem;
`;

export const loadingButtonStyle = css`
  margin-top: 3.2rem;
`;
