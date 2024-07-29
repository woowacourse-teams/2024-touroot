import styled from "@emotion/styled";

export const MultiImageUploadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;

export const MultiImageUploadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing.s};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.4rem;
  gap: ${(props) => props.theme.spacing.xs};

  ${(props) => props.theme.typography.mobile.detailBold};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const MultiImageUploadPictureContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-x: auto-scroll;
  gap: ${(props) => props.theme.spacing.m};
`;

export const MultiImageUploadPictureWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.4rem;
  gap: ${(props) => props.theme.spacing.s};

  p {
    ${(props) => props.theme.typography.mobile.detailBold}
    color: ${(props) => props.theme.colors.text.secondary}
  }
`;

export const MultiImageUploadPictureAddButton = styled.button<{ $hasPicture: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  margin-top: ${({ $hasPicture }) => ($hasPicture ? "0" : "0.5rem")};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.4rem;
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
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 50%;

  background-color: #fff;

  svg {
    width: 0.8rem;
  }
`;

export const MultiImageUploadHiddenInput = styled.input`
  display: none;
`;

export const ImageScrollContainer = styled.div<{ $isDragging: boolean }>`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  overflow: auto hidden;
  width: 100%;
  height: 7rem;
  padding: 1rem 1rem 0 0;
  padding-bottom: ${(props) => props.theme.spacing.s};
  gap: ${(props) => props.theme.spacing.m};
  scrollbar-width: none;
  cursor: ${({ $isDragging }) => ($isDragging ? "grab" : "pointer")};
`;

export const MultiImageUploadSVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;

  svg {
    width: 2rem;
  }
`;
