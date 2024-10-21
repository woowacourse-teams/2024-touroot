import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
  border-radius: 2rem;

  background-color: ${PRIMITIVE_COLORS.white};
  box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
`;
