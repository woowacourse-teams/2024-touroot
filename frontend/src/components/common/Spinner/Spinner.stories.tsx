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
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
