import type { Meta, StoryObj } from "@storybook/react";

import Icon from "@components/common/Icon/Icon";

import SVG_ICONS_MAP from "./svg-icons.json";

const meta = {
  title: "common/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "크기와 컬러를 조절 가능할 수 있는 아이콘 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    iconType: {
      description: "아이콘 타입",
      control: {
        type: "select",
        options: Object.keys(SVG_ICONS_MAP),
      },
    },
    color: {
      control: "color",
    },
    size: {
      control: "text",
    },
  },
  args: {
    iconType: "chevrons-right",
    color: "black",
    size: "24",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {Object.keys(SVG_ICONS_MAP).map((iconType) => (
        <div key={iconType} style={{ textAlign: "center" }}>
          <Icon iconType={iconType as keyof typeof SVG_ICONS_MAP} color="black" size="24" />
          <div>{iconType}</div>
        </div>
      ))}
    </div>
  ),
};
