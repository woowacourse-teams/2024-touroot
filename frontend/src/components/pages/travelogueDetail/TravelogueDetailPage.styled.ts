import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TravelogueDetailLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  padding-bottom: 10rem;
`;

export const TravelogueDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};

  padding: 0 1.6rem;
`;

export const AuthorInfoContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const IconButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;
`;

export const DropdownButton = styled.button`
  display: flex;

  width: 100%;
`;

export const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TravelogueOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m};

  padding: 0 1.6rem;
`;

export const TravelogueCardChipsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const titleStyle = css`
  line-height: 2.4rem;
`;

export const authorDateStyle = css`
  color: ${theme.colors.text.secondary};
`;
