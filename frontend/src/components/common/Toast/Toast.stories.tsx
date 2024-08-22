import type { Meta } from "@storybook/react";

import Toast from "@components/common/Toast/Toast";

const meta = {
  title: "common/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "크기와 컬러를 조절 가능할 수 있는 아이콘 컴포넌트",
      },
    },
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["error", "success"],
    },
    message: {
      control: "text",
    },
  },
  args: {
    message: "에러가 발생했습니다.",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

export const ErrorToast = {
  args: {
    status: "error",
    message: "에러가 발생했습니다.",
  },
};

export const SuccessToast = {
  args: {
    status: "success",
    message: "복사가 완료되었습니다.",
  },
};
