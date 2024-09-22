import { ComponentPropsWithoutRef } from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipProps extends ComponentPropsWithoutRef<"li"> {
  label: string;
  isSelected?: boolean;
  index?: number;
}

const Chip = ({
  label,
  isSelected = false,
  index,
  children,
  ...props
}: React.PropsWithChildren<ChipProps>) => {
  return (
    <S.Chip
      $isSelected={isSelected}
      $index={index}
      data-cy={isSelected ? `selected-${CYPRESS_DATA_MAP.chip}` : CYPRESS_DATA_MAP.chip}
      {...props}
    >
      <Text textType={isSelected ? "detailBold" : "detail"}>{label}</Text>
      {children}
    </S.Chip>
  );
};

export default Chip;
