import type { Meta, StoryObj } from "@storybook/react";

import TravelogueCard from "./TravelogueCard";

const meta = {
  title: "Components/TravelogueCard",
  component: TravelogueCard,
  argTypes: {
    travelogueOverview: {
      authorProfileImageUrl: { control: "text" },
      title: { control: "text" },
      thumbnail: { control: "text" },
      likeCount: { control: "number" },
    },
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
} satisfies Meta<typeof TravelogueCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    travelogueOverview: {
      id: 1,
      authorProfileUrl: "https://i.pinimg.com/564x/c0/d6/5e/c0d65ef2ff5b3e752b70fe54d94d6206.jpg",
      authorNickname: "리버",
      title: "갱얼쥐랑 캠핑 🐶",
      thumbnail: "https://i.pinimg.com/564x/20/bb/6d/20bb6d47bb88b8df862520c19c18600a.jpg",
      likeCount: 10,
    },
  },
};

export const WithInvalidThumbnail: Story = {
  args: {
    travelogueOverview: {
      id: 1,
      authorProfileUrl: "https://i.pinimg.com/564x/c0/d6/5e/c0d65ef2ff5b3e752b70fe54d94d6206.jpg",
      title: "갱얼쥐랑 캠핑 🐶",
      authorNickname: "리버",
      thumbnail: "invalidUrl",
      likeCount: 10,
    },
  },
};
