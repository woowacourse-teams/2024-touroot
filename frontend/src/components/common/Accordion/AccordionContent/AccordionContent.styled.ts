import styled from "@emotion/styled";

export const Layout = styled.div<{ $isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isExpanded }) => ($isExpanded ? "1fr" : "0fr")};
  transition: grid-template-rows 0.3s ease-out;
`;

export const Container = styled.div`
  overflow: hidden;
`;

export const Inner = styled.div<{ $isExpanded: boolean }>`
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  transition: opacity 0.3s ease-out ${({ $isExpanded }) => ($isExpanded ? "0.1s" : "0s")};
  padding: 1.6rem 0;
`;
