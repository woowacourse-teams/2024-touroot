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

export const DayDetailText = styled.span`
  display: inline-block;

  margin-left: 0.2rem;

  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 5.6rem;
`;

export const PlaceTodoListItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.s};
`;

export const addDayButtonStyle = css`
  margin-top: ${SPACING.m};
`;

export const addButtonStyle = css`
  display: flex;
  gap: ${SPACING.s};

  width: 100%;
  height: 4rem;
  margin-bottom: 3.2rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${SPACING.s};
`;

export const addTravelAddButtonStyle = css`
  display: flex;
  gap: ${SPACING.s};

  width: 100%;
  height: 4rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${SPACING.s};
`;

export const loadingButtonStyle = css`
  margin-top: ${SPACING.xl};
`;

export const startDateInputStyle = css`
  margin-bottom: 3.2rem;
`;

export const calendarStyle = css`
  margin-bottom: ${SPACING.xl};
`;

export const accordionRootStyle = css`
  & > :last-child {
    margin-bottom: ${SPACING.xl};
  }
`;
