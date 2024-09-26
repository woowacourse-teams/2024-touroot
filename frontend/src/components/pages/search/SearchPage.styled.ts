import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.m};
  min-height: calc(100vh - 6rem);
  padding: ${SPACING.m};
  padding-top: 0;
`;

export const SearchFallbackWrapper = styled.div`
  flex: 1;
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: ${SPACING.m};
`;

export const TabStyle = css`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 5rem;
  max-width: 45rem;
  margin: auto;

  background-color: ${PRIMITIVE_COLORS.white};
`;
