import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export const HandleBar = styled.div`
  width: 5.4rem;
  height: 0.3rem;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.border};

  cursor: pointer;
`;
