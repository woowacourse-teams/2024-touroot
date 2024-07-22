import styled from "@emotion/styled";

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
  gap: ${(props) => props.theme.spacing.xs};
`;

export const MultiImageUploadPicture = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
`;

export const MultiImageUploadPicturesInfo = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  border-radius: 0.4rem;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};

  p {
    ${(props) => props.theme.typography.mobile.detailBold}
    color: ${(props) => props.theme.colors.text.secondary}
  }

  svg {
    width: 2rem;
  }
`;
