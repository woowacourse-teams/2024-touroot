import type { ComponentPropsWithoutRef } from "react";

import type { ButtonPosition, ButtonVariants } from "@components/common/Button/Button.type";

import * as S from "./Button.styled";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variants?: ButtonVariants;
  position?: ButtonPosition;
}

const Button = ({ variants = "primary", position = "center", children, ...props }: ButtonProps) => {
  return (
    <S.Button $variants={variants} $position={position} {...props}>
      {children}
    </S.Button>
  );
};

export default Button;
