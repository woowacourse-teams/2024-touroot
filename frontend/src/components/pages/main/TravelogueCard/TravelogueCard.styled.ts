import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TravelogueCardLayout = styled.li`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.6rem;
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
  padding: 1.6rem 1.6rem 0;
`;

export const TravelogueCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.6rem;
`;

export const TravelogueCardTitleContainer = styled.div`
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
  padding: 0 1.6rem;
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

export const textBoldStyle = css`
  font-weight: 700;
`;
