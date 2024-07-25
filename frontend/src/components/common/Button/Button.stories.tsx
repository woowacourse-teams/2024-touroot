import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./Button";

const meta = {
  title: "common/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "투룻에서 사용하는 버튼 컴포넌트로, primary와 secondary로 구분",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variants: {
      description: "버튼의 형태",
      table: {
        type: { summary: "ButtonVariants" },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variants: "primary",
    children: "등록",
  },
};

export const Secondary: Story = {
  args: {
    variants: "secondary",
    children: "취소",
  },
};
