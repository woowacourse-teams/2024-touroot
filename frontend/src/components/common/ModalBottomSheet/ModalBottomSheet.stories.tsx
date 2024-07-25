import type { Meta, StoryObj } from "@storybook/react";

import ModalBottomSheet from "./ModalBottomSheet";

const meta = {
  title: "common/ModalBottomSheet",
  component: ModalBottomSheet,

  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
  },
} satisfies Meta<typeof ModalBottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainText: "여행기를 등록할까요?",
    subText: "등록한 후에도 다시 여행기를 수정할 수 있어요.",
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
};
