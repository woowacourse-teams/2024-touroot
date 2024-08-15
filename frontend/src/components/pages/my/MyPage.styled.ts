import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.l};
`;

export const BoxButton = styled.button`
  display: flex;
  gap: ${(props) => props.theme.spacing.m};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing.m};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 10px;
`;

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;

export const ColorButtonStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 6.8rem;
  padding: ${theme.spacing.m};
  border-radius: 10px;

  background-color: ${PRIMITIVE_COLORS.blue[50]};
  gap: ${theme.spacing.m};
`;

export const ListStyle = css`
  li {
    ${theme.typography.mobile.body};
    font-weight: 700;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border: solid 1px ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.typography.mobile.detail};
  border-radius: 10px;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  background: black;
`;

export const NicknameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
`;

export const inputStyle = css`
  ${theme.typography.mobile.bodyBold};
  width: 12rem;
  margin: 0 auto;
  border: none;
  border-bottom: 1px solid ${theme.colors.border};
  border-radius: 0;

  text-align: center;

  &::placeholder {
    color: ${theme.colors.text.secondary};
    text-align: center;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

export const NicknameStyle = css`
  margin-bottom: calc(1.2rem + 1px);

  font-weight: 700;
`;
