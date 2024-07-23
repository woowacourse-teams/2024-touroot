import styled from "@emotion/styled";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

export const MainText = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold}
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.secondary};
`;
