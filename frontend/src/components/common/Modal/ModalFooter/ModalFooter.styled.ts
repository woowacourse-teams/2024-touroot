import styled from "@emotion/styled";

export const Layout = styled.div<{ $direction: React.CSSProperties["flexDirection"] }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme }) => theme.spacing.s};

  width: 100%;
`;
