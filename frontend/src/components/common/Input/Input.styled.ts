import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  color: ${(props) => props.theme.colors.text.primary};
`;

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
