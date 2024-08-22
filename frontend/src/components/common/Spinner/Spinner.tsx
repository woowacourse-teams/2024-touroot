import type { SpinnerVariants } from "@components/common/Spinner/Spinner.type";

import { Tturi } from "@assets/svg";

import * as S from "./Spinner.styled";

interface SpinnerProps {
  variants?: SpinnerVariants;
  size?: number;
}

const Spinner = ({ variants = "tturi", size = 100 }: SpinnerProps) => {
  return (
    <S.LoadingSpinner $size={size} $variants={variants}>
      {variants === "tturi" && <Tturi />}
    </S.LoadingSpinner>
  );
};

export default Spinner;
