import styled from "@emotion/styled";

export const MainPageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  padding: 1.6rem;

  h1 {
    ${(props) => props.theme.typography.title};
  }

  p {
    color: ${(props) => props.theme.color.darkGray};
    font-size: 1.2rem;
  }
`;

export const MainPageTraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const MainPageContentContainer = styled.div`
  padding-top: calc(5.7rem + 2rem);
`;
