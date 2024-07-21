import styled from "@emotion/styled";

export const PlaceDetailCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 1rem;
  margin: 2rem 0;
`;

export const PlaceDetailCardTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 16px;
`;

export const PlaceDetailCardImageList = styled.li`
  width: 100%;
  height: 233px;
`;

export const PlaceDetailCardImageItem = styled.li`
  flex: 1;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const PlaceDetailCardDescription = styled.p`
  font-size: 12px;
  width: 100%;
  padding: 0 16px;
`;
