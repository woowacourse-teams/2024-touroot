import React from "react";

import type { SpinnerVariants } from "@components/common/Spinner/Spinner.type";

import { Tturi } from "@assets/svg";

import * as S from "./Spinner.styled";

interface SpinnerProps extends React.ComponentPropsWithoutRef<"div"> {
  variants?: SpinnerVariants;
  size?: number;
}

const Spinner = ({ variants = "tturi", size = 100, ...props }: SpinnerProps) => {
  return (
    <S.LoadingSpinner $size={size} $variants={variants} {...props}>
      {variants === "tturi" && <Tturi />}
    </S.LoadingSpinner>
  );
};

export default Spinner;
