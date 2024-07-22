import type { Meta, StoryObj } from "@storybook/react";

import CharacterCount from "../CharacterCount/CharacterCount";
import Input from "./Input/Input";
import InputContainer from "./InputContainer";

const meta = {
  title: "InputContainer",
  component: InputContainer,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof InputContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "제목",
    children: (
      <>
        <Input placeholder="제목을 입력해 주세요." />
        <CharacterCount count={0} maxCount={20} />
      </>
    ),
  },
};
