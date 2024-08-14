import styled from "@emotion/styled";

export const MainPageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;

  gap: 8px;

  h1 {
    ${({ theme }) => theme.typography.mobile.title};
  }

  p {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 1.2rem;
  }
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 4rem;
  padding: 0 1.6rem;
`;

export const MainPageContentContainer = styled.div`
  padding-top: 1.6rem;
`;
