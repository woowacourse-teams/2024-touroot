import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  overflow: hidden;
  position: relative;

  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.8rem;

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1.6rem;

  background-color: ${PRIMITIVE_COLORS.blue[400]};

  color: ${PRIMITIVE_COLORS.white};

  gap: 0.8rem;

  & > button:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const MonthMoveButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
`;

export const WeekdayHeaderContainer = styled.thead`
  display: grid;
  padding: 1.2rem 0;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

  text-align: center;
  grid-template-columns: repeat(7, 1fr);
`;

export const DaysGridContainer = styled.table`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  border-collapse: collapse;
`;

export const DayCell = styled.td<{ $isCurrentMonth: boolean; $isSelectable: boolean }>`
  padding: 1.2rem;

  ${({ $isSelectable }) =>
    $isSelectable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${PRIMITIVE_COLORS.blue[50]};
      }
    `};

  color: ${({ theme, $isCurrentMonth }) =>
    $isCurrentMonth ? theme.colors.text.secondary : PRIMITIVE_COLORS.gray[300]};
  text-align: center;
`;

export const WeekRow = styled.tr`
  display: contents;
`;

export const boldTextStyle = css`
  font-weight: 700;
`;
