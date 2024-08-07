import type { Meta, StoryObj } from "@storybook/react";

import TravelogueCardSkeleton from "./TravelogueCardSkeleton";

const meta = {
  title: "skeleton/TravelogueCardSkeleton",
  component: TravelogueCardSkeleton,
  decorators: [
    (Story, context) => {
      return (
        <div style={{ width: "48rem" }}>
          <Story args={{ ...context.args }} />
        </div>
      );
    },
  ],
} satisfies Meta<typeof TravelogueCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
