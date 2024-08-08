import styled from "@emotion/styled";

export const TabList = styled.ul`
  display: flex;
  overflow: scroll hidden;
  width: 100%;

  white-space: no-wrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.li<{ isSelected: boolean; $tabCount: number }>`
  flex: 0 0 calc(100% / ${({ $tabCount }) => ($tabCount <= 3 ? $tabCount : 3.5)});
  padding: 1rem 2rem;
  border-bottom: 2px solid ${(props) => (props.isSelected ? "#0090ff" : "transparent")};

  color: ${(props) => (props.isSelected ? "#0090ff" : "#616161")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
`;
