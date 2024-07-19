import styled from "@emotion/styled";

export const LoginText = styled.span`
  ${({ theme }) => theme.typography.mainTextBold}
  color: ${({ theme }) => theme.color.black};
`;

export const HiddenDiv = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

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
  ${({ theme }) => theme.typography.title};
`;

export const GreetingSubText = styled.span`
  ${({ theme }) => theme.typography.mainTextBold};
  color: ${({ theme }) => theme.color.darkGray};
`;
