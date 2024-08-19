import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Checkbox from "./Checkbox";

const meta = {
  title: "common/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isChecked: {
      control: {
        type: "boolean",
      },
      description: "체크 박스의 체크 상태",
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },

  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NonCheck: Story = {
  args: {
    isChecked: false,
  },
};

export const Check = {
  args: {
    isChecked: true,
  },
};
