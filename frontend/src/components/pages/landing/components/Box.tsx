import { ComponentPropsWithRef, forwardRef } from "react";

import * as S from "./Box.styled";

interface BoxProps extends Omit<ComponentPropsWithRef<"div">, "ref"> {}

const Box = forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  return (
    <S.Layout {...props} ref={ref}>
      {children}
    </S.Layout>
  );
});

export default Box;
