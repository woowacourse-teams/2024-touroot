import React from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipOwnProps<Element extends React.ElementType = React.ElementType> {
  as?: Element;
  label: string;
  isSelected?: boolean;
  index?: number;
}

type ChipProps<E extends React.ElementType> = ChipOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ChipOwnProps>;

function Chip<E extends React.ElementType>({
  as,
  label,
  isSelected = false,
  index,
  children,
  ...props
}: ChipProps<E>) {
  const Component = as || "li";

  return (
    <S.Layout
      as={Component}
      $isSelected={isSelected}
      $index={index}
      data-cy={isSelected ? `selected-${CYPRESS_DATA_MAP.chip}` : CYPRESS_DATA_MAP.chip}
      {...props}
    >
      <Text textType={isSelected ? "detailBold" : "detail"}>{label}</Text>
      {children}
    </S.Layout>
  );
}

export default Chip;
