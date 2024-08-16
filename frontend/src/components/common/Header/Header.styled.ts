import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};

  width: 100%;
  height: 6rem;
  max-width: 48rem;
  padding: 1.6rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

  background-color: #fff;
`;

export const DrawHeaderContainer = styled.div`
  display: flex;
`;

export const MenuItem = styled.li`
  ${(props) => props.theme.typography.mobile.bodyBold};
  padding: ${({ theme }) => theme.spacing.s};
  cursor: pointer;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.l};

  width: 100%;
  padding: 1.6rem;

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const HeaderTitle = styled.span`
  ${({ theme }) => theme.typography.mobile.bodyBold}
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const HiddenDiv = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

export const HeaderRightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const FormWrapper = styled.form`
  flex: 1;
  position: relative;
  padding-left: 1.6rem;
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-radius: 50%;
  background: rgb(0 0 0/ 10%);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
`;
