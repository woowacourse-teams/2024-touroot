import React from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import theme from "@styles/theme";

import Icon from "../Icon/Icon";
import SVG_ICONS_MAP from "../Icon/svg-icons.json";
import Text from "../Text/Text";
import { DEFAULT_ELEMENT } from "./Chip.constants";
import * as S from "./Chip.styled";

interface ChipOwnProps<Element extends React.ElementType = typeof DEFAULT_ELEMENT> {
  as?: Element;
  label: string;
  isSelected?: boolean;
  index?: number;
  iconPosition?: "none" | "left" | "right";
  iconType?: keyof typeof SVG_ICONS_MAP;
}

type ChipProps<E extends React.ElementType> = ChipOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ChipOwnProps>;

const Chip = <E extends React.ElementType>({
  as,
  label,
  isSelected = false,
  index,
  iconPosition = "none",
  iconType = "down-arrow",
  ...props
}: ChipProps<E>) => {
  const Component = as ?? DEFAULT_ELEMENT;

  return (
    <S.Layout
      as={Component}
      $isSelected={isSelected}
      $index={index}
      data-cy={isSelected ? `selected-${CYPRESS_DATA_MAP.chip}` : CYPRESS_DATA_MAP.chip}
      {...props}
    >
      {iconPosition === "left" && (
        <Icon
          iconType={iconType}
          size="8"
          color={isSelected ? theme.colors.primary : theme.colors.text.secondary}
        />
      )}
      <Text textType={isSelected ? "detailBold" : "detail"}>{label}</Text>
      {iconPosition === "right" && (
        <Icon
          iconType={iconType}
          size="8"
          color={isSelected ? theme.colors.primary : theme.colors.text.secondary}
        />
      )}
    </S.Layout>
  );
};
export default Chip;
