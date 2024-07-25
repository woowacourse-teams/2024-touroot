import { Meta, StoryObj } from "@storybook/react";

import Drawer from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "common/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <div style={{ padding: "20px" }}>
        <Drawer.Trigger>
          <button style={{ border: "1px solid #616161", padding: "1rem", borderRadius: "8px" }}>
            Open Drawer
          </button>
        </Drawer.Trigger>
      </div>
      <Drawer.Header>
        <h2>Drawer Header</h2>
      </Drawer.Header>
      <Drawer.Content>
        <p>내용</p>
      </Drawer.Content>
    </Drawer>
  ),
};
