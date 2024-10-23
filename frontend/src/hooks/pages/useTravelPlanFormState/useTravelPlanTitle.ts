import { useCallback, useState } from "react";

import { TravelPlanDay } from "@type/domain/travelPlan";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import getInitialTravelTitle from "@utils/getInitialTravelTitle";
import { validateTitle } from "@utils/validation/travelPlan";

const useTravelPlanTitle = (travelPlanDays: TravelPlanDay[]) => {
  const [title, setTitle] = useState(
    getInitialTravelTitle({ days: travelPlanDays, type: "travelPlan" }),
  );
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  const handleChangeTitle = useCallback(
    (inputValue: string) => {
      const errorMessage = validateTitle(inputValue);

      if (errorMessage) {
        setTitleErrorMessage(errorMessage);
        return;
      }

      const trimmedTitle = inputValue.slice(
        FORM_VALIDATIONS_MAP.title.minLength,
        FORM_VALIDATIONS_MAP.title.maxLength,
      );

      setTitle(trimmedTitle);
      setTitleErrorMessage("");
    },
    [setTitleErrorMessage, setTitle],
  );

  const isEnabledTravelogueTitle = titleErrorMessage === "" && title !== "";

  return { title, isEnabledTravelogueTitle, titleErrorMessage, handleChangeTitle };
};

export default useTravelPlanTitle;
