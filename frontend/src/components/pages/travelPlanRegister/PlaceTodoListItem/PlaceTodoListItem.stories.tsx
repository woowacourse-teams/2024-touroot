import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import PlaceTodoListItem from "@components/pages/travelPlanRegister/PlaceTodoListItem/PlaceTodoListItem";

const meta = {
  title: "travelPlanRegister/PlaceTodoListItem",
  component: PlaceTodoListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChangeContent: {
      table: {
        disable: true,
      },
    },
    onDeleteTodo: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    onChangeContent: fn(),
    onDeleteTodo: fn(),
  },
} satisfies Meta<typeof PlaceTodoListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
