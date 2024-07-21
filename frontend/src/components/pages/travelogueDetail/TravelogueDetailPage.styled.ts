import styled from "@emotion/styled";

export const TitleLayout = styled.section`
  margin-top: 5.7rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 25rem;
  object-fit: cover;
  object-position: center;
  border: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
  padding: 0 1.6rem;
`;

export const Title = styled.span`
  ${(props) => props.theme.typography.title}
`;

export const AuthorDateContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const AuthorDate = styled.span`
  ${(props) => props.theme.typography.detail}
  ${(props) => props.theme.color.darkGray}
`;

export const LikesContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: flex-end;
  align-items: center;
`;

export const Likes = styled.span`
  ${(props) => props.theme.typography.detail}
`;
