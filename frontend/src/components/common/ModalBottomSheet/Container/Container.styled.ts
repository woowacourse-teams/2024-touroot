import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Container = styled.div<{ $currentY: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  bottom: 0;

  width: 100%;
  padding: 2.4rem;
  border-radius: 10px 10px 0px 0px;

  background-color: ${PRIMITIVE_COLORS.white};

  transform: translateY(${({ $currentY }) => $currentY}px);
  transition: transform 0.3s ease-out;
`;
