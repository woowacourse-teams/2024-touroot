import type { Meta, StoryObj } from "@storybook/react";

import Chip from "./Chip";

const meta = {
  title: "common/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "투룻에서 사용하는 칩 컴포넌트로, isSelected로 색상 구분",
      },
    },
  },
  argTypes: {
    label: {
      description: "태그 라벨",
      control: {
        type: "select",
      },
      options: ["🏡 가족", "🐾 반려동물", "⛱️ 여름", "💕 연인", "🍴 맛집", "🚶 도보"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: false,
    label: "🐾 반려동물",
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    label: "🐾 반려동물",
  },
};
