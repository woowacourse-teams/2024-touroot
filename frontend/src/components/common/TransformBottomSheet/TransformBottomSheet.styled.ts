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
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 48rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ $isOpen }) => ($isOpen ? "12rem" : "5rem")};
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-out;
  overflow: hidden;
  z-index: 1000;
`;

export const BottomSheetContent = styled.div`
  padding: 20px;
  height: 100%;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
