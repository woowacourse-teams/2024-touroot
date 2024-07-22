import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input/Input";
import InputField from "./InputField";

const meta = {
  title: "InputField",
  component: InputField,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "제목",
    count: 0,
    maxCount: 20,
    children: <Input placeholder="제목을 입력해 주세요." />,
  },
};
