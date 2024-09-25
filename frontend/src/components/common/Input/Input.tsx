import { forwardRef } from "react";

import CharacterCount from "../CharacterCount/CharacterCount";
import * as S from "./Input.styled";
import type { InputVariants } from "./Input.type";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  count?: number;
  maxCount?: number;
  variants?: InputVariants;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ count, maxCount, variants = "round", ...props }, ref) => {
    return (
      <S.InputContainer>
        <S.Input variant={variants} {...props} ref={ref} />
        {maxCount ? <CharacterCount count={count} maxCount={maxCount} /> : null}
      </S.InputContainer>
    );
  },
);

Input.displayName = "Input";

export default Input;
