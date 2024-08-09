import type { Meta, StoryObj } from "@storybook/react";

import PlaceDetailCard from "./PlaceDetailCard";

const meta = {
  title: "Components/PlaceDetailCard",
  component: PlaceDetailCard,
  argTypes: {
    index: { control: "number" },
    title: { control: "text" },
    imageUrls: { control: "object" },
    description: { control: "text" },
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
} satisfies Meta<typeof PlaceDetailCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 1,
    title: "제목 ㅋㅋ",
    imageUrls: ["https://i.pinimg.com/564x/e3/cc/52/e3cc52244f9b6810a0321b35fe249fbf.jpg"],
    description: "여행지 설명",
  },
};

export const WithInvalidImage: Story = {
  args: {
    index: 1,
    title: "제목 ㅋㅋ",
    imageUrls: ["invalidUrl.com"],
    description: "여행지 설명",
  },
};
