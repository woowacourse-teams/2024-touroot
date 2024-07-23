import styled from "@emotion/styled";

export const BackDrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.dimmed};
`;
