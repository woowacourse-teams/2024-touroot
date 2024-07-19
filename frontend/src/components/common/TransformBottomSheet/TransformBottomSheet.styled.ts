import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideUp = keyframes`
  from {
    height: 5rem;
  }
  to {
    height: 12rem;
  }
`;

const slideDown = keyframes`
  from {
    height: 12rem;
  }
  to {
    height: 5rem;
  }
`;

export const BottomSheetLayout = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? "12rem" : "5rem")};
  max-width: 48rem;

  background-color: white;

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-out;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
`;

export const BottomSheetContent = styled.div`
  height: 100%;
  padding: 20px;
  overflow-y: auto;

  ${(props) => props.theme.typography.detailBold}
`;

export const BottomSheetBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;

  background-color: white;
`;

export const BottomSheetButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;

  background-color: #007bff;

  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;
