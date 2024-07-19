import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;

  width: 100%;
  height: 233px;
`;

export const CarouselImageList = styled.ul`
  display: flex;

  width: 100%;
  height: 100%;

  transition: transform 0.3s ease-in-out;
`;

export const CarouselImageItem = styled.li`
  flex: 0 0 100%;

  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;
  }
`;

export const CarouselButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;

  background-color: rgb(0 0 0 / 50%);

  cursor: pointer;

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CarouselImageBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  border-radius: 20px;
  padding: 6px 10px;

  background-color: rgb(0 0 0 / 50%);

  color: #fff;
  font-size: 12px;

  img {
    height: 13px;
  }
`;
