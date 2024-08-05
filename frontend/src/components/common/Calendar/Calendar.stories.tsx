import { useState } from "react";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";

import Calendar from "@components/common/Calendar/Calendar";
import Input from "@components/common/Input/Input";

const meta = {
  title: "common/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "특정 년-월-일을 선택할 수 있는 캘린더 컴포넌트",
      },
    },
  },
  args: {
    onClose: fn(),
    onSelectDate: fn(),
  },
  argTypes: {
    onSelectDate: {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

export const Default = {};

export const DayPicker = {
  render: () => {
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);

    const handleInputClick = () => {
      setIsShowCalendar(true);
    };

    const handleSelectDate = (date: Date) => {
      setStartDate(date);
      setIsShowCalendar(false);
    };

    return (
      <div>
        <h1>여행 기간</h1>
        <Input
          value={startDate ? startDate.toLocaleDateString() : ""}
          onClick={handleInputClick}
          readOnly
          placeholder="시작일 선택"
        />
        <div style={{ width: "300px", position: "relative" }}>
          {isShowCalendar && (
            <Calendar
              onClose={() => setIsShowCalendar((prev) => !prev)}
              onSelectDate={handleSelectDate}
            />
          )}
        </div>
      </div>
    );
  },
};
