import styled from "@emotion/styled";

export const TravelogueCardLayout = styled.li`
  display: flex;
  flex-direction: column;
  max-width: calc(48rem - 3.2rem);
  padding: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.8rem;

  gap: 1rem;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);

    border-radius: 8px;
  }
`;

export const TravelogueCardHeader = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

export const TravelogueCardTitle = styled.h3`
  ${(props) => props.theme.typography.mobile.bodyBold};
  overflow: hidden;
  width: 100%;

  white-space: nowrap;

  text-overflow: ellipsis;
`;

export const TravelogueCardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TravelogueCardAuthorContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  h2 {
    ${(props) => props.theme.typography.mobile.bodyBold};
  }

  p {
    ${(props) => props.theme.typography.mobile.body}
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
  border-radius: 0.8rem 0.8rem 0 0;

  line-height: 0;
  vertical-align: bottom;
`;

export const TravelogueCardThumbnail = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.spacing.s};
  object-fit: cover;
  object-position: center;
`;

export const TravelogueCardChipsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;
