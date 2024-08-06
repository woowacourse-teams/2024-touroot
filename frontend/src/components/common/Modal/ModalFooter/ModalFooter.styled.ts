import styled from "@emotion/styled";

export const Layout = styled.div<{ $direction: React.CSSProperties["flexDirection"] }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.m};
`;
