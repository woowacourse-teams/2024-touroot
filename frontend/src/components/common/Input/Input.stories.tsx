import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

const meta = {
  title: "common/Input",
  component: Input,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "제목을 입력해 주세요.",
  },
};

export const BottomBorderInput: Story = {
  args: {
    placeholder: "제목을 입력해 주세요.",
    variants: "bottom",
  },
};

export const FocusBottomBorderInput: Story = {
  args: {
    placeholder: "제목을 입력해 주세요.",
    variants: "none",
  },
};
