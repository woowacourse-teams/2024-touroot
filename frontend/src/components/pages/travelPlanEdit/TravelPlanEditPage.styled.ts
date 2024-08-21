import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xl};

  padding: ${SPACING.m};

  & > :last-child {
    margin-top: -${SPACING.xl};
  }
`;

export const AccordionRootContainer = styled.div`
  margin-top: ${SPACING.m};
`;

export const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.s};
`;

export const StartDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.s};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 5.6rem;
`;

export const addDayButtonStyle = css`
  margin-top: ${SPACING.m};
`;

export const addButtonStyle = css`
  display: flex;
  gap: ${SPACING.s};

  width: 100%;
  height: 4rem;
  margin-bottom: ${SPACING.xl};
  padding: 1.2rem 1.6rem;
  border: 0.1rem solid ${theme.colors.border};
  border-radius: ${SPACING.s};
`;

export const loadingButtonStyle = css`
  margin-top: ${SPACING.xl};
`;

export const startDateInputStyle = css`
  margin: 0 0 ${SPACING.xl};
`;

export const calendarStyle = css`
  margin-bottom: ${SPACING.xl};
`;

export const accordionRootStyle = css`
  & > :last-child {
    margin-bottom: ${SPACING.xl};
  }
`;