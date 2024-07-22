import { ButtonHTMLAttributes } from "react";

import * as S from "./Button.styled";

export type ButtonColor = "primary" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  label: string;
}

const Button = ({ color, label, ...props }: ButtonProps) => {
  return (
    <S.Button $color={color} {...props}>
      {label}
    </S.Button>
  );
};

export default Button;
