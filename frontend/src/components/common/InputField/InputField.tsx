import React, { PropsWithChildren } from "react";

import * as S from "./InputField.styled";

interface InputFieldProps {
  label: string;
  count: number;
  maxCount: number;
}

const InputField: React.FC<PropsWithChildren<InputFieldProps>> = ({
  label,
  children,
  count,
  maxCount,
}) => {
  return (
    <S.InputField>
      <S.Label>{label}</S.Label>
      {children}
      <S.CountWrapper>
        <S.Count>{`${count}/${maxCount}`}</S.Count>
      </S.CountWrapper>
    </S.InputField>
  );
};

export default InputField;
