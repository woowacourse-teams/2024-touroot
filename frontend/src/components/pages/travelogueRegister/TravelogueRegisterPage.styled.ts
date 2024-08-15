import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xl};

  padding: 1.6rem;
`;

export const AccordionRootContainer = styled.div`
  & > * {
    margin-bottom: 1.6rem;
  }
`;

export const ChipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.s};
`;

export const Chips = styled.ul`
  display: flex;
  overflow: scroll hidden;
  gap: ${SPACING.s};

  white-space: no-wrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  & > li {
    flex: 0 0 auto;

    cursor: pointer;
  }
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.s};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 5.6rem;
`;

export const subTextColor = css`
  color: ${PRIMITIVE_COLORS.gray[700]};
`;

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

export const addDayButtonStyle = css`
  margin-top: 1.6rem;
`;

export const loadingButtonStyle = css`
  margin-top: 3.2rem;
`;
