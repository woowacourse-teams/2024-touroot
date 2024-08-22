import React, { ReactNode } from "react";

import * as S from "./Box.styled";

interface BoxProps {
  placeName: string;
  icon?: ReactNode;
}

const Box = ({
  children,
  placeName,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & React.PropsWithChildren<BoxProps>) => {
  return (
    <S.Box {...props}>
      <S.Header>
        <S.PlaceName>{placeName}</S.PlaceName>
        {icon ? icon : null}
      </S.Header>
      <div>{children}</div>
    </S.Box>
  );
};

export default Box;
