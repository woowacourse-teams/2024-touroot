import styled from "@emotion/styled";

export const TravelogueCardLayout = styled.li`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.8rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 5%);

  gap: 1rem;

  cursor: pointer;
`;

export const TravelogueCardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.6rem;
`;

export const TravelogueCardTitleContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-start;
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
  object-fit: cover;
  object-position: center;
`;
