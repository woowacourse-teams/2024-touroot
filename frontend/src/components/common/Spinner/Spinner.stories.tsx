import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "./Spinner";

const meta = {
  title: "common/Spinner",
  component: Spinner,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        component:
          "두 가지 variants(tturi, circle)가 있는 Spinner 컴포넌트이며, tturi의 경우 size를 70~100 정도로 사용해야합니다.",
      },
    },
  },
  argTypes: {
    variants: {
      options: ["tturi", "circle"],
      control: "select",
    },
    size: {
      control: "range",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variants: "tturi",
    size: 100,
  },
};
