import styled from "@emotion/styled";

export const Wrapper = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  height: ${({ size }) => size}px;
`;
