import styled from "@emotion/styled";

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  padding: 1.6rem;
  width: 100%;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.background.disabled};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 9rem;
  border: none;
  resize: none;

  background-color: ${({ theme }) => theme.colors.background.disabled};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
