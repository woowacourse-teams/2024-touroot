import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    border-color: ${PRIMITIVE_COLORS.black};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
