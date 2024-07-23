import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";

import * as S from "./Container.styled";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  currentY: number;
}

const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
  ({ currentY, children, ...props }, ref) => {
    return (
      <S.Container $currentY={currentY} ref={ref} {...props}>
        {children}
      </S.Container>
    );
  },
);

export default Container;
