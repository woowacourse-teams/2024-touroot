import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import MultiImageUpload from "@components/common/MultiImageUpload/MultiImageUpload";

const meta = {
  title: "Common/MultiImageUpload",
  component: MultiImageUpload,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "48rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    previewImageStates: [],
    fileInputRef: React.createRef(),
    onImageChange: () => {},
    onDeleteImage: () => {},
    onButtonClick: () => {},
  },
};

export const WithImages: Story = {
  args: {
    ...Default.args,
    previewImageStates: [
      { url: "https://example.com/image1.jpg", isLoading: false },
      { url: "https://example.com/image2.jpg", isLoading: false },
      { url: "https://example.com/image3.jpg", isLoading: false },
    ],
  },
};

export const WithLoadingImages: Story = {
  args: {
    ...Default.args,
    previewImageStates: Array.from({ length: 3 }, (_, index) => ({
      url: `https://example.com/image${index}.jpg`,
      isLoading: true,
    })),
  },
};

const createMockFileList = (count: number) => {
  const dataTransfer = new DataTransfer();
  Array(count)
    .fill(null)
    .forEach(() => {
      const file = new File(["mock content"], "mock-image.png", { type: "image/png" });
      dataTransfer.items.add(file);
    });
  return dataTransfer.files;
};

export const InteractiveUpload: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const inputElement = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;
    if (inputElement) {
      Object.defineProperty(inputElement, "files", {
        value: createMockFileList(3),
      });
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  },
};
