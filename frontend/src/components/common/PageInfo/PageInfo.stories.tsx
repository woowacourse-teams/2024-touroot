import type { Meta, StoryObj } from "@storybook/react";

import PageInfo from "./PageInfo";

const meta = {
  title: "common/PageInfo",
  component: PageInfo,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof PageInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainText: "여행기 등록",
    subText: "소중한 여행기를 공유해주세요.",
  },
};
