import styled from "@emotion/styled";

export const Wrapper = styled.div<{ size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
