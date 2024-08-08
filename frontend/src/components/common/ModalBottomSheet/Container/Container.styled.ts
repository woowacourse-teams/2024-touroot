import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Container = styled.div<{ $currentY: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.bottomSheet};

  width: 100%;
  padding: 2.4rem;
  border-radius: 10px 10px 0 0;

  background-color: ${PRIMITIVE_COLORS.white};
  gap: 6.4rem;

  transform: translateY(${({ $currentY }) => $currentY}px);
  transition: transform 0.3s ease-out;
`;
