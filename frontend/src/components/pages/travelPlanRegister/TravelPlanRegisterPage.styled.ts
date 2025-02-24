import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.m};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};

  width: 100%;
`;

export const TitleMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const StartDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const DayDetailText = styled.span`
  display: inline-block;

  margin-left: 0.2rem;

  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PlaceTodoListItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const addDayButtonStyle = css`
  margin-top: ${SPACING.m};
`;

export const addButtonStyle = css`
  display: flex;
  gap: ${SPACING.s};

  width: 100%;
  height: 4rem;
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

export const visualHiddenStyle = css`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;

  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;

export const errorTextStyle = css`
  flex: 2;
  width: 100%;

  color: ${theme.colors.danger};
`;

export const characterCountStyle = css`
  flex: 1;
`;
