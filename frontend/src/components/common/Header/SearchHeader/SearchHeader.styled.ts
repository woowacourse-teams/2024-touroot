import styled from "@emotion/styled";

export const FormWrapper = styled.form`
  flex: 1;
  position: relative;
  padding-left: 1.6rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-radius: 50%;
  background: rgb(0 0 0/ 10%);
`;
