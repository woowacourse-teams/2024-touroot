import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import ThumbnailUpload from "./ThumbnailUpload";

const meta = {
  title: "common/ThumbnailUpload",
  component: ThumbnailUpload,
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
} satisfies Meta<typeof ThumbnailUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// 모의 함수들을 생성합니다
const mockOnChangeImage = () => {};
const mockOnClickButton = () => {};

export const Default: Story = {
  args: {
    previewUrls: [],
    fileInputRef: React.createRef<HTMLInputElement>(),
    onChangeImage: mockOnChangeImage,
    onClickButton: mockOnClickButton,
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    previewUrls: ["https://example.com/mock-image.jpg"],
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (inputElement) {
          const file = new File([""], "example.png", { type: "image/png" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);

          Object.defineProperty(inputElement, "files", {
            value: dataTransfer.files,
          });

          const event = new Event("change", { bubbles: true });
          inputElement.dispatchEvent(event);
        }
      }, []);

      return <Story />;
    },
  ],
};
