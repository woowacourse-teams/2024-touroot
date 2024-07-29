import styled from "@emotion/styled";

export const CharacterCountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 1.2rem;
`;

export const CharacterCount = styled.span`
  ${({ theme }) => theme.typography.mobile.detail};
  color: ${(props) => props.theme.colors.text.secondary};
`;
