import styled from "@emotion/styled";

export const TodoListItemContainer = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s};
  align-items: center;
`;
