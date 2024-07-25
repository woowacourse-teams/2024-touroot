import DatePicker from "react-datepicker";

import { ko } from "date-fns/locale";

import Input from "@components/common/Input/Input";

const DateRangePicker = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  onChangeStartDate: (date: Date | null) => void;
  onChangeEndDate: (date: Date | null) => void;
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date
      .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replace(/\. /g, "년 ")
      .replace(".", "일");
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(dates) => {
        const [start, end] = dates;
        onChangeStartDate(start);
        onChangeEndDate(end);
      }}
      startDate={startDate as Date}
      endDate={endDate as Date}
      selectsRange={true}
      locale={ko}
      dateFormat="yyyy년 MM월 dd일"
      customInput={
        <Input
          label="여행 기간"
          count={0}
          value={`${formatDate(startDate)} - ${formatDate(endDate)}`}
          readOnly
        />
      }
    />
  );
};

export default DateRangePicker;
