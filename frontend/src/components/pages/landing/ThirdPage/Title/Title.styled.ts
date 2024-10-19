import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  color: ${({ theme }) => theme.colors.primary};
  gap: ${({ theme }) => theme.spacing.s};
`;

export const Line = styled.div`
  flex: 1;
  width: 100%;
  height: 1px;
  opacity: 0.3;

  background-color: ${({ theme }) => theme.colors.primary};
`;
