import styled from "@emotion/styled";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.2rem 0;
  padding: 0 1.6rem;
  gap: 0.8rem;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typography.mobile.subTitle}
  margin-left: 1.6rem;
`;
