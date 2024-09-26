import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS, SPACING, Z_INDEX } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.m};
  min-height: calc(100vh - 6rem);
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
  z-index: ${Z_INDEX.default};
  width: 100%;
  height: 5rem;
  max-width: 48rem;

  background-color: ${PRIMITIVE_COLORS.white};
`;
