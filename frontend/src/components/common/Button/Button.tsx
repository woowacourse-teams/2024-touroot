import type { ComponentPropsWithoutRef } from "react";

import type { ButtonVariants } from "@components/common/Button/Button.type";

import * as S from "./Button.styled";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variants?: ButtonVariants;
}

const Button = ({ variants = "primary", children, ...attributes }: ButtonProps) => {
  return (
    <S.Button $variants={variants} {...attributes}>
      {children}
    </S.Button>
  );
};

export default Button;
