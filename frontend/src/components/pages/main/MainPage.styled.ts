import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

export const MainPageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.m};

  margin-top: ${SPACING.m};
  padding: ${SPACING.m};
`;

export const MainPageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${SPACING.s};
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: ${SPACING.m};
`;

export const Chips = styled.ul`
  display: flex;
  overflow: scroll hidden;
  gap: ${SPACING.s};

  margin: 0 -${SPACING.m};
  padding: 0 ${SPACING.m};

  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  & > li {
    flex: 0 0 auto;

    cursor: pointer;
  }
`;

export const subTitleColorStyle = css`
  color: ${PRIMITIVE_COLORS.gray[700]};
`;
