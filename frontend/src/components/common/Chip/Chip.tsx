import { ComponentPropsWithoutRef } from "react";

import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipProps extends ComponentPropsWithoutRef<"button"> {
  isSelected: boolean;
  label: string;
}

const Chip = ({ isSelected, label, ...props }: ChipProps) => {
  return (
    <S.Chip $isSelected={isSelected} {...props}>
      {isSelected ? (
        <Text textType="detailBold">{label}</Text>
      ) : (
        <Text textType="detail">{label}</Text>
      )}
    </S.Chip>
  );
};

export default Chip;
