import React, { PropsWithChildren } from "react";

import * as S from "./InputContainer.styled";

interface InputFieldProps {
  label: string;
}

const InputContainer: React.FC<PropsWithChildren<InputFieldProps>> = ({ label, children }) => {
  return (
    <S.InputContainer>
      <S.Label>{label}</S.Label>
      {children}
    </S.InputContainer>
  );
};

export default InputContainer;
