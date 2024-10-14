import { useState } from "react";

const useTravelPlanStartDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleSelectStartDate = (date: Date, handleCloseCalendar: () => void) => {
    setStartDate(date);
    handleCloseCalendar();
  };

  const handleInitializeStartDate = (startDate: string) => {
    setStartDate(new Date(startDate));
  };

  return { startDate, handleSelectStartDate, handleInitializeStartDate };
};

export default useTravelPlanStartDate;
