import styled from "@emotion/styled";

export const Layout = styled.div<{ $direction: React.CSSProperties["flexDirection"] }>`
  display: flex;
  flex: 1;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.spacing.s};

    background-color: ${({ theme }) => theme.colors.border};
  }
`;
