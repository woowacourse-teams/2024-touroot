import styled from "@emotion/styled";

export const TabList = styled.ul`
  display: flex;
  overflow: scroll hidden;
  width: 100%;

  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.li<{ isSelected: boolean; $tabCount: number }>`
  display: flex;
  flex: 0 0 calc(100% / ${({ $tabCount }) => ($tabCount <= 3 ? $tabCount : 3.5)});
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.l};
  border-bottom: 2px solid
    ${({ isSelected, theme }) => (isSelected ? `${theme.colors.primary}` : "transparent")};

  color: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.primary}` : `${theme.colors.text.secondary}`};
  ${({ isSelected, theme }) =>
    isSelected ? theme.typography.mobile.detailBold : theme.typography.mobile.detail};
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
`;
