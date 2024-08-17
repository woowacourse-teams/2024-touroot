import React from "react";

import * as S from "./Box.styled";

interface BoxProps {
  placeName: string;
}

const Box = ({
  children,
  placeName,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & React.PropsWithChildren<BoxProps>) => {
  return (
    <S.Box {...props}>
      <>
        <S.PlaceName>{placeName}</S.PlaceName>
      </>
      {children}
    </S.Box>
  );
};

export default Box;
