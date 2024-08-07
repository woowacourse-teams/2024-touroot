import type { Meta, StoryObj } from "@storybook/react";

import Text from "../Text/Text";
import Dropdown from "./Dropdown";

const meta = {
  title: "common/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "투룻에서 사용하는 드롭다운 컴포넌트로, position과 size에 따라 구분",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "드롭다운의 위치",
    },
    size: {
      description: "드롭다운의 크기",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: "center",
    size: "small",
    children: (
      <>
        <Text textType="detail" onClick={() => {}} style={{ cursor: "pointer" }}>
          수정
        </Text>
        <Text textType="detail" onClick={() => {}} style={{ cursor: "pointer" }}>
          삭제
        </Text>
      </>
    ),
  },
};
