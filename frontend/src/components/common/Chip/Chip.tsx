import { ComponentPropsWithoutRef } from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipProps extends ComponentPropsWithoutRef<"li"> {
  isSelected?: boolean;
  label: string;
}

const Chip = ({ isSelected = false, label, ...props }: ChipProps) => {
  return (
    <S.Chip
      $isSelected={isSelected}
      data-cy={isSelected ? `selected-${CYPRESS_DATA_MAP.chip}` : CYPRESS_DATA_MAP.chip}
      {...props}
    >
      <Text textType={isSelected ? "detailBold" : "detail"}>{label}</Text>
    </S.Chip>
  );
};

export default Chip;
