import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;

  gap: 8px;

  h1 {
    ${({ theme }) => theme.typography.mobile.title};
  }
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.m};
`;

export const MainPageContentContainer = styled.div`
  padding-top: 1.6rem;
`;
