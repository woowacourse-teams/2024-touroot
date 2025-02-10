import type { Meta, StoryObj } from "@storybook/react";

import Text from "@components/common/Text/Text";

import { TYPOGRAPHY } from "@styles/tokens";

const meta: Meta<typeof Text> = {
  title: "common/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 텍스트 스타일을 적용할 수 있는 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    textType: {
      description: "텍스트의 크기 및 스타일",
      control: {
        type: "radio",
        options: Object.keys(TYPOGRAPHY.mobile),
      },
    },
    children: {
      description: "텍스트 내용",
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        <Text textType="heading">heading</Text>
        <Text textType="title">title</Text>
        <Text textType="subTitle"> subTitle</Text>
        <Text textType="body">body</Text>
        <Text textType="detail">detail</Text>
      </div>
    );
  },
};

export const Heading: Story = {
  args: {
    textType: "heading",
    children: "heading",
  },
};

export const Title: Story = {
  args: {
    textType: "title",
    children: "title",
  },
};

export const SubTitle: Story = {
  args: {
    textType: "subTitle",
    children: "subTitle",
  },
};

export const Body: Story = {
  args: {
    textType: "body",
    children: "body",
  },
};

export const Detail: Story = {
  args: {
    textType: "detail",
    children: "detail",
  },
};
