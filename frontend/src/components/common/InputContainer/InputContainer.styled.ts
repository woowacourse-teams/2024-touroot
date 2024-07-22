import styled from "@emotion/styled";

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
