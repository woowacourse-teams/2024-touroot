import { InputHTMLAttributes } from "react";

import CharacterCount from "../CharacterCount/CharacterCount";
import * as S from "./Input.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  count?: number;
  maxCount?: number;
  label: string;
}

const Input = ({ label, count, maxCount, ...props }: InputProps) => {
  return (
    <S.InputContainer>
      <S.Label>{label}</S.Label>
      <S.Input {...props} />
      {count && maxCount ? <CharacterCount count={count} maxCount={maxCount} /> : null}
    </S.InputContainer>
  );
};

export default Input;
