import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};

  width: 100%;
  padding: ${(props) => props.theme.spacing.l};
`;

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.m};

  width: 100%;
`;

export const listStyle = css`
  li {
    ${theme.typography.mobile.bodyBold};
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m};

  width: 100%;
`;

export const ProfileEditButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

export const EditButton = styled.button`
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  border: solid 1px ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.typography.mobile.detail};
  border-radius: 10px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  position: relative;
`;

export const ProfileImageWrapper = styled.div<{ $isProfileImageLoading: boolean }>`
  display: ${({ $isProfileImageLoading }) => ($isProfileImageLoading ? "none" : "block")};
`;

export const ProfileImageLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 12.9rem;
  height: 12.9rem;
`;

export const ProfileImageHiddenInput = styled.input`
  display: none;
`;

export const NicknameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 6.5rem;
`;

export const NickNameEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s};

  width: 100%;
  height: 6.5rem;
`;

export const Button = styled.button`
  width: 100%;
`;

export const profileImageEditButtonStyle = css`
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: 50%;
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

export const nicknameStyle = css`
  padding: 1.2rem 1.6rem;
`;

export const deleteTextColor = css`
  color: ${theme.colors.text.required};
`;
