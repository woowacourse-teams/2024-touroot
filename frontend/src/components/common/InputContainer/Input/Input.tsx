import { InputHTMLAttributes } from "react";

import * as S from "./Input.styled";

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <S.Input {...props} />;
};

export default Input;
