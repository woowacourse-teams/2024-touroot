import styled from "@emotion/styled";

export const MultiImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.m};
  margin: 1rem 0;
`;

export const MultiImageUploadButton = styled.button`
  display: flex;
  width: 100%;
  padding: ${(props) => props.theme.spacing.s};
  border: 1px solid ${(props) => props.theme.colors.border};
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};

  ${(props) => props.theme.typography.mobile.detailBold};
  color: ${(props) => props.theme.colors.text.secondary};
  border-radius: 0.4rem;
`;

export const MultiImageUploadPictureContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.m};
`;

export const MultiImageUploadPictureWrapper = styled.div`
  display: flex;
  position: relative;

  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.m};
`;

export const MultiImageUploadPicture = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
`;

export const MultiImageUploadPicturesInfo = styled.div`
  display: flex;
  width: 6rem;
  height: 6rem;
  border-radius: 0.4rem;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.s};

  p {
    ${(props) => props.theme.typography.mobile.detailBold}
    color: ${(props) => props.theme.colors.text.secondary}
  }

  svg {
    width: 2rem;
  }
`;

export const MultiImageUploadDeleteButton = styled.button`
  display: flex;
  position: absolute;
  top: -1rem;
  right: -1rem;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border};

  background-color: #fff;
  border-radius: 50%;

  ${(props) => props.theme.typography.mobile.detailBold}
`;

export const MultiImageUploadHiddenInput = styled.input`
  display: none;
`;
