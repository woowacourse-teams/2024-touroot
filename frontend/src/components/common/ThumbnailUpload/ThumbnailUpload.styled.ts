import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS } from "@styles/tokens";

export const ThumbnailUploadContainer = styled.div<{ $hasBorder: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 20rem;
  border: ${({ $hasBorder }) => ($hasBorder ? `1px solid ${theme.colors.border}` : "none")};
  border-radius: 0.8rem;
`;

export const ThumbnailUploadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.theme.spacing.xs};
`;
export const ThumbnailUploadImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ThumbnailUploadHiddenInput = styled.input`
  display: none;
`;

export const ThumbnailUploadEditButton = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 30%);

  ${(props) => props.theme.typography.mobile.bodyBold}
  color: #fff;
`;

export const ThumbnailUploadEditButtonContainer = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.default};
  width: 100%;
  height: 100%;
`;

export const ThumbnailUploadLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const uploadDeleteButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  z-index: ${theme.zIndex.default + 1};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  background-color: rgb(0 0 0 / 20%);
`;
