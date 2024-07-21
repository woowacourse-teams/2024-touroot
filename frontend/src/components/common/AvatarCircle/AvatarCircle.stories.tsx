import type { Meta, StoryObj } from "@storybook/react";

import AvatarCircle from "./AvatarCircle";

const meta = {
  title: "Components/AvatarCircle",
  component: AvatarCircle,
  argTypes: {
    $size: {
      control: {
        type: "select",
        options: ["small", "large"],
      },
    },
    userAvatar: { control: "text" },
  },
  decorators: [
    (Story, context) => {
      return (
        <div style={{ width: "48rem" }}>
          <Story args={{ ...context.args }} />
        </div>
      );
    },
  ],
} satisfies Meta<typeof AvatarCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    $size: "small",
    userAvatar: "https://i.pinimg.com/564x/c0/d6/5e/c0d65ef2ff5b3e752b70fe54d94d6206.jpg",
  },
};

export const Large: Story = {
  args: {
    $size: "large",
    userAvatar: "https://i.pinimg.com/564x/4c/a5/a1/4ca5a1de62690b5615925ce3def4636d.jpg",
  },
};

export const WithDefaultAvatar: Story = {
  args: {
    $size: "small",
    userAvatar: "https://invalid-image-url.jpg",
  },
};

export const LargeWithDefaultAvatar: Story = {
  args: {
    $size: "large",
    userAvatar: "https://invalid-image-url.jpg",
  },
};
