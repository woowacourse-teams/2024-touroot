import { forwardRef } from "react";

import CharacterCount from "../CharacterCount/CharacterCount";
import * as S from "./Input.styled";
import type { InputVariants } from "./Input.type";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  count?: number;
  maxCount?: number;
  label?: string;
  variants?: InputVariants;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, count, maxCount, variants = "round", ...props }, ref) => {
    return (
      <S.InputContainer>
        <S.Label>{label}</S.Label>
        <S.Input variant={variants} {...props} ref={ref} />
        <CharacterCount count={count} maxCount={maxCount} />
      </S.InputContainer>
    );
  },
);

Input.displayName = "Input";

export default Input;
