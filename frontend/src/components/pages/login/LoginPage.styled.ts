import styled from "@emotion/styled";

export const TturiImg = styled.img`
  width: 26rem;
  height: 26rem;
`;

export const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GreetingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

export const GreetingMainText = styled.span`
  ${({ theme }) => theme.typography.mobile.title};
`;

export const GreetingSubText = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const LoginButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 2.4rem;
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 6rem;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.kakao};
`;

export const LoginLabel = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  opacity: 0.85;
`;
