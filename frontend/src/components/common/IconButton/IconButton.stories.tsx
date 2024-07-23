import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import theme from "@styles/theme";
import { PRIMITIVE_COLORS, SPACING } from "@styles/tokens";

import SVG_ICON_MAP from "../Icon/svg-icons.json";
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
  decorators: [
    (Story) => (
      <div
        style={{
          width: "48rem",
          padding: "1.6rem",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
      control: {
        type: "radio",
        options: Object.keys({ ...SVG_ICON_MAP }),
      },
    },
    size: {
      description: "아이콘 크기",
      control: {
        type: "text",
      },
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
  width: "100%",
  height: "4rem",
  padding: "1.2rem 1.6rem",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "1.6rem",
  fontWeight: "700",
  color: PRIMITIVE_COLORS.black,
  gap: SPACING.s,
  borderRadius: SPACING.s,
};

export const PositionLeftIcon = {
  render: () => {
    return (
      <div>
        <IconButton size="16" iconType="plus" position="left" style={buttonStyle} onClick={fn()}>
          장소 추가하기
        </IconButton>
      </div>
    );
  },
};

export const PositionRightIcon = {
  render: () => {
    return (
      <div>
        <IconButton
          size="16"
          iconType="empty-heart"
          position="right"
          style={buttonStyle}
          onClick={fn()}
        >
          취소
        </IconButton>
      </div>
    );
  },
};

export const CenteredIcon: Story = {
  args: {
    iconType: "hamburger",
    position: "center",
  },
};
