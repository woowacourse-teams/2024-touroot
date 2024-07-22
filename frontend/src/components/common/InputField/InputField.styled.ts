import styled from "@emotion/styled";

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.mobile.bodyBold};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

export const Count = styled.span`
  ${({ theme }) => theme.typography.mobile.detail};
  color: ${(props) => props.theme.colors.text.secondary};
`;
