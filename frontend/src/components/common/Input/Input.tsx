import { forwardRef } from "react";

import CharacterCount from "../CharacterCount/CharacterCount";
import * as S from "./Input.styled";

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  count?: number;
  maxCount?: number;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, count, maxCount, ...props }, ref) => {
    return (
      <S.InputContainer>
        <S.Label>{label}</S.Label>
        <S.Input {...props} ref={ref} />
        <CharacterCount count={count} maxCount={maxCount} />
      </S.InputContainer>
    );
  },
);

Input.displayName = "Input";

export default Input;
