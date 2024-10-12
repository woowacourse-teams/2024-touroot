import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const MainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m};

  margin-top: 16rem;
  padding: ${({ theme }) => theme.spacing.m};
  min-height: calc(100vh - 7.6rem);
`;

export const FixedLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 6rem;
  z-index: ${({ theme }) => theme.zIndex.floating};
  gap: ${({ theme }) => theme.spacing.m};

  width: 100%;
  max-width: 48rem;
  padding: ${({ theme }) => theme.spacing.m};

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.s};
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

export const OptionContainer = styled.button`
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

export const MainPageList = styled.li`
  width: 100%;
`;

