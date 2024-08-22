import styled from "@emotion/styled";

export const Layout = styled.div<{ $isClosed: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isClosed }) => ($isClosed ? "1fr" : "0fr")};
  transition: grid-template-rows 0.3s ease-out;
`;

export const Container = styled.div`
  overflow: hidden;
`;

export const Inner = styled.div<{ $isClosed: boolean }>`
  opacity: ${({ $isClosed }) => ($isClosed ? 1 : 0)};
  transition: opacity 0.3s ease-out ${({ $isClosed }) => ($isClosed ? "0.1s" : "0s")};
  padding: 1.6rem 0;
`;
