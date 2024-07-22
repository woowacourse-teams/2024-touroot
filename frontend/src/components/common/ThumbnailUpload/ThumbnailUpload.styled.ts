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
  justify-content: center;
  align-items: center;
`;

export const ThumbnailUploadImage = styled.img`
  width: 100%;
`;
