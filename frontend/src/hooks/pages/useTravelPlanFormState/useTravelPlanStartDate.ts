import { useState } from "react";

const useTravelPlanStartDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const onSelectStartDate = (date: Date, handleCloseCalendar: () => void) => {
    setStartDate(date);
    handleCloseCalendar();
  };

  const onInitializeStartDate = (startDate: string) => {
    setStartDate(new Date(startDate));
  };

  return { startDate, onSelectStartDate, onInitializeStartDate };
};

export default useTravelPlanStartDate;
