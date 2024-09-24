import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const MainPageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m};

  margin-top: ${({ theme }) => theme.spacing.m};
  padding: ${({ theme }) => theme.spacing.m};
  min-height: calc(100vh - 7.6rem);
`;

export const MainPageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.s};
`;

export const SearchFallbackWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.m};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const SingleSelectionTagsContainer = styled.ul`
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

export const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  cursor: pointer;
`;

export const LastElement = styled.div`
  height: 0.1rem;
`;

export const subTitleStyle = css`
  color: ${PRIMITIVE_COLORS.gray[700]};

  & > span {
    @media (width > 360px) {
      display: inline-block;
    }

    @media (width <= 360px) {
      display: block;
    }
  }
`;

export const selectedOptionStyle = css`
  color: ${theme.colors.primary};
`;

export const unselectedOptionStyle = css`
  color: ${theme.colors.text.secondary};
`;
