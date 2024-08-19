import { StrokeLineCap, StrokeLineJoin } from "@components/common/Icon/Icon.type";

import SVG_ICONS_MAP from "./svg-icons.json";

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  iconType: keyof typeof SVG_ICONS_MAP;
  color?: string;
  size: string;
}

const Icon = ({ iconType, color, size, ...attributes }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${SVG_ICONS_MAP[iconType].width} ${SVG_ICONS_MAP[iconType].height}`}
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d={SVG_ICONS_MAP[iconType].path}
        stroke={color ?? SVG_ICONS_MAP[iconType].stroke}
        strokeWidth={SVG_ICONS_MAP[iconType].strokeWidth}
        strokeLinecap={SVG_ICONS_MAP[iconType].strokeLinecap as StrokeLineCap}
        strokeLinejoin={SVG_ICONS_MAP[iconType].strokeLinejoin as StrokeLineJoin}
        fill={
          SVG_ICONS_MAP[iconType].strokeLinecap === "round" && iconType !== "kakao" ? "none" : color
        }
      />
    </svg>
  );
};

export default Icon;
