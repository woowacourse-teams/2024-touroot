import { useCallback, useState } from "react";

const useTravelPlanStartDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleSelectStartDate = useCallback(
    (date: Date, handleCloseCalendar: () => void) => {
      setStartDate(date);
      handleCloseCalendar();
    },
    [setStartDate],
  );

  const handleInitializeStartDate = useCallback(
    (startDate: string) => {
      setStartDate(new Date(startDate));
    },
    [setStartDate],
  );

  return { startDate, handleSelectStartDate, handleInitializeStartDate };
};

export default useTravelPlanStartDate;
