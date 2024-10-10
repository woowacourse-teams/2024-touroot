import { useState } from "react";

import { TravelPlanDay } from "@type/domain/travelPlan";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import getInitialTravelTitle from "@utils/getInitialTravelTitle";

const useTravelPlanTitle = (travelPlanDays: TravelPlanDay[]) => {
  const [title, setTitle] = useState(
    getInitialTravelTitle({ days: travelPlanDays, type: "travelPlan" }),
  );

  const onChangeTitle = (inputValue: string) => {
    const trimmedTitle = inputValue.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );

    setTitle(trimmedTitle);
  };

  return { title, onChangeTitle };
};

export default useTravelPlanTitle;
