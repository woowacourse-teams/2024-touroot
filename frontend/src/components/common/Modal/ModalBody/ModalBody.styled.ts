import styled from "@emotion/styled";

export const Layout = styled.div<{ $direction: React.CSSProperties["flexDirection"] }>`
  display: flex;
  flex: 1;
  flex-direction: ${({ $direction }) => $direction};
  align-items: center;
  overflow-y: auto;

  width: 100%;
  padding: 0.1rem 0; /* 요소의 크기에 관계없이 스크롤이 생기는 문제 해결하기 위한 패딩 추가 */

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
