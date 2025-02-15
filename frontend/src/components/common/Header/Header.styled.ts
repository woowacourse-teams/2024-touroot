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

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const DrawHeaderContainer = styled.div`
  display: flex;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.l};

  width: 100%;
  padding: 1.6rem;

  background-color: ${PRIMITIVE_COLORS.white};
`;

export const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightContainer = styled.div<{ $isRightContentFull?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m};
  justify-content: center;
  align-items: center;
  ${({ $isRightContentFull = false }) => $isRightContentFull && "flex: 1;"}
`;
