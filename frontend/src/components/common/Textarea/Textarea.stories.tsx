import type { Meta, StoryObj } from "@storybook/react";

import Textarea from "./Textarea";

const meta = {
  title: "common/Textarea",
  component: Textarea,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
    maxCount: 150,
    placeholder: "장소에 대한 간단한 설명을 남겨주세요.",
  },
};
