import styled from "@emotion/styled";

export const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;

  width: 100%;
  height: fit-content;
  max-width: 48rem;
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.borderGray};

  background-color: ${({ theme }) => theme.color.white};
`;
