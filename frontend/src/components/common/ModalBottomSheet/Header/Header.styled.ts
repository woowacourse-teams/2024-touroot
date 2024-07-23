import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export const HandleBar = styled.div`
  width: 5.4rem;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  cursor: pointer;
`;
