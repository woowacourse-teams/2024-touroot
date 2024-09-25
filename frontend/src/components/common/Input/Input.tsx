import { forwardRef } from "react";

import * as S from "./Input.styled";
import type { InputVariants } from "./Input.type";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  variants?: InputVariants;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ variants = "round", ...props }, ref) => {
  return <S.Input variant={variants} {...props} ref={ref} />;
});

Input.displayName = "Input";

export default Input;
