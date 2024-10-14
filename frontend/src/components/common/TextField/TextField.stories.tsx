import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Input, MultiImageUpload, ThumbnailUpload } from "@components/common";

import TextField from "./TextField";

const inputContents = {
  input: <Input placeholder="여행기 제목을 입력해주세요." />,
  imageUploader: (
    <MultiImageUpload
      previewImageStates={[]}
      fileInputRef={React.createRef()}
      onImageChange={() => {}}
      onDeleteImage={() => {}}
      onButtonClick={() => {}}
    />
  ),
  thumbnailUploader: (
    <ThumbnailUpload id="thumbnail-upload-1" previewUrls={[]} onChangeImage={() => {}} />
  ),
  calendar: <Input placeholder="시작일을 입력해주세요" />,
};

const meta = {
  title: "common/TextField",

  component: TextField,
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
    isRequired: { control: "boolean" },
    children: { control: "select", options: Object.keys(inputContents), mapping: inputContents },
  },
  decorators: [
    (Story, context) => {
      return (
        <div style={{ padding: 0, width: "48rem", position: "relative" }}>
          <Story args={{ ...context.args }} />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleTextField: Story = {
  args: {
    title: "제목",
    isRequired: true,
    children: "input",
  },
};

export const ThumbnailTextField: Story = {
  args: {
    title: "썸네일",
    isRequired: true,
    children: "thumbnailUploader",
  },
};

export const Calendar: Story = {
  args: {
    title: "시작일",
    subTitle: "시작일을 선택하면 마감일은 투룻이 계산 해드릴게요!",
    isRequired: true,
    children: "calendar",
  },
};
