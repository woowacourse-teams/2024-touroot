import styled from "@emotion/styled";

export const TabList = styled.ul`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: no-wrap;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.li<{ isSelected: boolean; $tabCount: number }>`
  flex: 0 0 calc(100% / ${({ $tabCount }) => ($tabCount < 3 ? $tabCount : 3)});
  text-align: center;
  padding: 1rem 2rem;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.isSelected ? "#0090ff" : "transparent")};
  color: ${(props) => (props.isSelected ? "#0090ff" : "#616161")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  transition: all 0.2s ease;
  font-size: 12px;
  white-space: nowrap;
`;
