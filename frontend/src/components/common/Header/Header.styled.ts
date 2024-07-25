import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 500;
  width: 100%;
  height: fit-content;
  max-width: 48rem;
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

  background-color: #fff;
`;

export const DrawHeaderContainer = styled.div`
  display: flex;
`;

export const MenuItem = styled.li`
  ${(props) => props.theme.typography.mobile.bodyBold}
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;

  width: 100%;
  padding: 1.6rem;

  background-color: ${PRIMITIVE_COLORS.white};

  cursor: pointer;
`;

export const HeaderTitle = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold}
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const HiddenDiv = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;
