import type { Meta, StoryObj } from "@storybook/react";

import TransformBottomSheet from "@components/common/TransformBottomSheet/TransformBottomSheet";

const meta = {
  title: "common/TransformBottomSheet",
  component: TransformBottomSheet,
  parameters: {
    layout: "centered",
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
} satisfies Meta<typeof TransformBottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
