import styled from "@emotion/styled";

export const TitleLayout = styled.section`
  display: flex;
  margin-top: 5.7rem;
  flex-direction: column;
  gap: 1.6rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  gap: 0.8rem;

  width: 100%;
  padding: 0 1.6rem;
`;

export const Title = styled.span`
  display: block;
  ${({ theme }) => theme.typography.mobile.subTitle};
  word-wrap: break-word;
  max-width: 100%;

  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const AuthorDateContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const AuthorDate = styled.span`
  ${({ theme }) => theme.typography.mobile.detail}
  ${({ theme }) => theme.colors.text.secondary}
`;

export const LikesContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: flex-end;
  align-items: center;
`;

export const Likes = styled.span`
  ${({ theme }) => theme.typography.mobile.detail}
`;
