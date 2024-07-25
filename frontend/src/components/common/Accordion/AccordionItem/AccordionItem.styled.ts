import styled from "@emotion/styled";

import { SPACING } from "@styles/tokens";

export const Layout = styled.div`
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: ${SPACING.s};
`;
