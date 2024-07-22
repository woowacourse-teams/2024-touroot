import styled from "@emotion/styled";

export const CharacterCountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

export const CharacterCount = styled.span`
  ${({ theme }) => theme.typography.mobile.detail};
  color: ${(props) => props.theme.colors.text.secondary};
`;
