import styled from "@emotion/styled";

export const BackDrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};

  background-color: ${({ theme }) => theme.colors.dimmed};
`;
