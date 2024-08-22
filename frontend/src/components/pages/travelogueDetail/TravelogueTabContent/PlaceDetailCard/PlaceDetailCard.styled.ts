import styled from "@emotion/styled";

export const PlaceDetailCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d9d9d9;
`;

export const PlaceDetailCardTitle = styled.h3`
  margin: 0 16px;

  font-weight: bold;
  font-size: 16px;
`;

export const PlaceDetailCardImageList = styled.li`
  width: 100%;
  height: 233px;
`;

export const PlaceDetailCardImageItem = styled.li`
  flex: 1;
  overflow: hidden;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const PlaceDetailCardDescription = styled.p`
  width: 100%;
  padding: 0 16px;

  font-size: 12px;
  white-space: pre-line;
`;

export const Image = styled.img`
  width: 100%;
  height: 233px;

  object-position: center;
  object-fit: cover;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 233px;

  object-position: center;
  object-fit: cover;
`;
