import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: ${SPACING.xxl};
  min-height: calc(100vh - 16rem);
  padding-top: 15rem;
`;

export const FixedLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 11rem;
  z-index: 10;

  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.m};

  background-color: ${PRIMITIVE_COLORS.white};
  gap: ${({ theme }) => theme.spacing.m};
`;

export const searchResultTextStyle = css`
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  margin: ${SPACING.m};

  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`;

export const SearchFallbackWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 ${SPACING.m};
  gap: ${SPACING.m};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const SingleSelectionTagsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s};

  & > li {
    cursor: pointer;
  }
`;

export const MultiSelectionTagsContainer = styled.ul`
  display: flex;
  overflow: scroll hidden;
  gap: ${({ theme }) => theme.spacing.s};

  height: 3rem;
  margin: 0 -${({ theme }) => theme.spacing.m};
  padding: 0 ${({ theme }) => theme.spacing.m};

  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  & > li {
    cursor: pointer;
  }
`;

export const OptionContainer = styled.button`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const selectedOptionStyle = css`
  color: ${theme.colors.primary};
`;

export const unselectedOptionStyle = css`
  color: ${theme.colors.text.secondary};
`;
