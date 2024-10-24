import styled from "@emotion/styled";

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.background.disabled};
  gap: 0.8rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 9rem;
  border: none;

  background-color: ${({ theme }) => theme.colors.background.disabled};

  font-size: 1.6rem;
  resize: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
