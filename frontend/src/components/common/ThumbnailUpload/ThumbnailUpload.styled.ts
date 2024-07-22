import styled from "@emotion/styled";

export const ThumbnailUploadContainer = styled.div`
  display: flex;
  overflow: hidden;
  object-fit: cover;
  object-position: center;

  width: 100%;
  height: 20rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  justify-content: center;
  align-items: center;

  border-radius: 0.8rem;
`;

export const ThumbnailUploadButton = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailUploadImage = styled.img`
  width: 100%;
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
  z-index: 10;
  width: 100%;
  height: 100%;
`;
