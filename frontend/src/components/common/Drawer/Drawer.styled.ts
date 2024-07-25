import styled from "@emotion/styled";

export const DrawerContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-210px")};
  z-index: 10000;
  width: 210px;
  height: 100%;

  transition: right 0.3s ease-in-out;

  background-color: #fff;
  flex-direction: column;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 30%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

export const DrawerHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const TriggerButton = styled.button`
  background: none;
  border: none;

  font-size: 1.5rem;
  cursor: pointer;
`;
