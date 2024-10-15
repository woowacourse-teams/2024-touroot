import { useState } from "react";

import { validateStartDate } from "@utils/validation/travelPlan";

const useTravelPlanStartDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startDateErrorMessage, setStartDateErrorMessage] = useState<string>("");

  const handleSelectStartDate = (date: Date, handleCloseCalendar: () => void) => {
    const errorMessage = validateStartDate(date);
    if (errorMessage) {
      setStartDateErrorMessage(errorMessage);
    } else {
      setStartDate(date);
      setStartDateErrorMessage("");
      handleCloseCalendar();
    }
  };

  const handleInitializeStartDate = (startDate: string) => {
    setStartDate(new Date(startDate));
  };

  const isEnabledStartDate = startDateErrorMessage === "" && startDate !== null;

  console.log(startDateErrorMessage, startDate);

  return {
    startDate,
    startDateErrorMessage,
    isEnabledStartDate,
    handleSelectStartDate,
    handleInitializeStartDate,
  };
};

export default useTravelPlanStartDate;
