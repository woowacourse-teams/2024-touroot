import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TturiImg = styled.img`
  width: 26rem;
  height: 26rem;
`;

export const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GreetingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const LoginButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  padding: ${({ theme }) => theme.spacing.l};
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};

  width: 100%;
  height: 6rem;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.kakao};
`;

export const LoginLabel = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  opacity: 0.85;
`;

export const greetingSubTextStyle = css`
  color: ${theme.colors.text.secondary};
`;
