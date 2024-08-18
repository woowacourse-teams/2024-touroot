import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

import SVG_ICONS_MAP from "../Icon/svg-icons.json";
import IconButton from "./IconButton";

const meta = {
  title: "common/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "아이콘을 추가할 수 있는 버튼 컴포넌트",
      },
    },
  },

  tags: ["autodocs"],
  argTypes: {
    onClick: {
      table: { disable: true },
    },
    position: {
      description: "아이콘의 위치",
      control: {
        type: "radio",
        options: ["left", "right", "center"],
      },
    },
    iconType: {
      description: "아이콘 타입",
      options: Object.keys(SVG_ICONS_MAP),
      control: {
        type: "select",
      },
    },
    size: {
      description: "아이콘 크기",
      control: {
        type: "text",
      },
    },
    children: {
      description: "버튼 내부 텍스트",
      control: "text",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const buttonStyle = {
  display: "flex",
  height: "4rem",
  padding: "1.2rem 1.6rem",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "1.6rem",
  fontWeight: "700",
  color: PRIMITIVE_COLORS.black,
  gap: SPACING.s,
  borderRadius: SPACING.s,
};

export const PositionLeftIcon: Story = {
  args: {
    size: "16",
    iconType: "plus",
    position: "left",
    children: "장소 추가하기",
  },
  render: (args) => (
    <IconButton {...args} style={buttonStyle}>
      {args.children}
    </IconButton>
  ),
};

export const PositionRightIcon: Story = {
  args: {
    size: "16",
    iconType: "hamburger",
    position: "right",
    children: "메뉴",
  },
  render: (args) => (
    <IconButton {...args} style={buttonStyle}>
      {args.children}
    </IconButton>
  ),
};

export const CenteredIcon: Story = {
  args: {
    size: "16",
    iconType: "empty-heart",
    position: "center",
  },
  render: (args) => <IconButton {...args} />,
};
