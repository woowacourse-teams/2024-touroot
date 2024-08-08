import type { Meta, StoryObj } from "@storybook/react";

import LoginFallback from "./LoginFallback";

const meta = {
  title: "common/LoginFallback",
  component: LoginFallback,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof LoginFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainText: "로그인 처리 중입니다",
    subText: "잠시만 기다려주세요",
  },
};
