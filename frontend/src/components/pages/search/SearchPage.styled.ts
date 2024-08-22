import { css } from "@emotion/react";
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

export const searchResultTextStyle = css`
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  max-width: 100%;

  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`;
