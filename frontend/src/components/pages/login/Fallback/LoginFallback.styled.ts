import styled from "@emotion/styled";

export const TturiImg = styled.img`
  width: 26rem;
  height: 26rem;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const MainText = styled.span`
  ${({ theme }) => theme.typography.mobile.title};
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
