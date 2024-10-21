import { ComponentPropsWithoutRef } from "react";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import theme from "@styles/theme";

import Icon from "../Icon/Icon";
import SVG_ICONS_MAP from "../Icon/svg-icons.json";
import Text from "../Text/Text";
import * as S from "./Chip.styled";

interface ChipProps extends ComponentPropsWithoutRef<"li"> {
  label: string;
  isSelected?: boolean;
  index?: number;
  iconPosition?: "none" | "left" | "right";
  iconType?: keyof typeof SVG_ICONS_MAP;
}

const Chip = ({
  label,
  isSelected = false,
  index,
  iconPosition = "none",
  iconType = "down-arrow",
  ...props
}: ChipProps) => {
  return (
    <S.Layout
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
