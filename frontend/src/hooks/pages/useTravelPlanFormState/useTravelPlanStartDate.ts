import { useCallback, useState } from "react";

import { validateStartDate } from "@utils/validation/travelPlan";

const useTravelPlanStartDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateErrorMessage, setStartDateErrorMessage] = useState<string>("");

  const handleSelectStartDate = useCallback(
    (date: Date, handleCloseCalendar: () => void) => {
      const errorMessage = validateStartDate(date);
      if (errorMessage) {
        setStartDateErrorMessage(errorMessage);
      } else {
        setStartDate(date);
        setStartDateErrorMessage("");
        handleCloseCalendar();
      }
    },
    [setStartDate],
  );

  const handleInitializeStartDate = useCallback(
    (startDate: string) => {
      setStartDate(new Date(startDate));
    },
    [setStartDate],
  );

  const isEnabledStartDate = startDateErrorMessage === "" && startDate !== null;

  return {
    startDate,
    startDateErrorMessage,
    isEnabledStartDate,
    handleSelectStartDate,
    handleInitializeStartDate,
  };
};

export default useTravelPlanStartDate;
