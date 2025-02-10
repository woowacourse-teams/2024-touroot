import { ComponentPropsWithoutRef } from "react";

import Icon from "@components/common/Icon/Icon";
import { IconButtonPosition } from "@components/common/IconButton/IconButton.type";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import SVG_ICON_MAP from "../Icon/svg-icons.json";
import * as S from "./IconButton.styled";

interface IconButtonProps extends React.PropsWithChildren<ComponentPropsWithoutRef<"button">> {
  iconType: keyof typeof SVG_ICON_MAP;
  position?: IconButtonPosition;
  size?: string;
  color?: string;
}

const IconButton = ({
  children,
  iconType,
  color = PRIMITIVE_COLORS.black,
  size = "24",
  position = "center",
  ...attributes
}: IconButtonProps) => {
  return (
    <S.IconButton {...attributes}>
      {position === "left" && <Icon color={color} iconType={iconType} size={size} />}
      {position === "center" ? <Icon color={color} iconType={iconType} size={size} /> : children}
      {position === "right" && <Icon color={color} iconType={iconType} size={size} />}
    </S.IconButton>
  );
};

export default IconButton;
