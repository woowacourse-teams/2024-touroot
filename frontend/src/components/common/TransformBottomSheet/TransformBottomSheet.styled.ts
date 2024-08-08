import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

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
  z-index: ${({ theme }) => theme.zIndex.bottomSheet};
  gap: 1rem;

  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? "12rem" : "5rem")};
  max-width: 48rem;
  padding: 1rem;
  border-radius: 2rem 2rem 0 0;

  background-color: ${PRIMITIVE_COLORS.white};

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-out;
  box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
`;

export const BottomSheetButtonWrapper = styled.div`
  width: 100%;
`;
