import styled from "@emotion/styled";

export const TravelogueCardLayout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  cursor: pointer;
`;

export const TravelogueCardHeader = styled.header`
  display: flex;
  width: 100%;
  padding: 0 1.6rem;
  justify-content: space-between;
  align-items: center;
`;

export const TravelogueCardTitleContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;

  h2 {
    ${(props) => props.theme.typography.mainTextBold};
  }

  p {
    ${(props) => props.theme.typography.mainText}
  }
`;

export const TravelogueCardLikesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  font-size: 1.6rem;
`;

export const TravelogueCardThumbnailContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 25rem;
  border-radius: 0.4rem;
`;

export const TravelogueCardThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease-in-out;

  li:hover & {
    transform: scale(1.02);
  }
`;
