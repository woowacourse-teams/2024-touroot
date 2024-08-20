import styled from "@emotion/styled";

import { SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.m};

  margin-top: ${SPACING.m};
  min-height: calc(100vh - 6rem);
  padding: ${SPACING.m};
`;

export const SearchFallbackWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: ${SPACING.m};
`;
