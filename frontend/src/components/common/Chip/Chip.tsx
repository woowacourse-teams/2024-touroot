import { ComponentPropsWithoutRef } from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipProps extends ComponentPropsWithoutRef<"li"> {
  label: string;
  isSelected?: boolean;
  index?: number;
}

const Chip = ({ label, isSelected = false, index, children, ...props }: ChipProps) => {
  return (
    <S.Layout
      $isSelected={isSelected}
      $index={index}
      data-cy={isSelected ? `selected-${CYPRESS_DATA_MAP.chip}` : CYPRESS_DATA_MAP.chip}
      {...props}
    >
      <Text textType={isSelected ? "detailBold" : "detail"}>{label}</Text>
      {children}
    </S.Layout>
  );
};

export default Chip;
