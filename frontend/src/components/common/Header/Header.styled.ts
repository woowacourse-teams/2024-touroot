import styled from "@emotion/styled";

export const HeaderLayout = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 500;
  width: 100%;
  height: fit-content;
  padding: 1.6rem;

  background-color: #fff;
  max-width: 48rem;
  justify-content: space-between;
  border-bottom: 0.1rem solid #eaf4f8;
`;

export const DrawHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const MenuItem = styled.li`
  ${(props) => props.theme.typography.mainTextBold}
`;

export const MenuList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin-top: 3.2rem;

  cursor: pointer;
`;
