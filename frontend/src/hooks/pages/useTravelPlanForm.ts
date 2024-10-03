import { useState } from "react";

import { TravelTransformDays } from "@type/domain/travelTransform";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import getInitialTravelTitle from "@utils/getInitialTravelTitle";

const useTravelPlanForm = (transformDays: TravelTransformDays[]) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const onSelectCalendar = (date: Date, handleCloseCalendar: () => void) => {
    setStartDate(date);
    handleCloseCalendar();
  };

  const {
    travelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onDeletePlace,
    onAddPlaceTodo,
    onDeletePlaceTodo,
    onChangeContent,
  } = useTravelPlanDays(transformDays);

  const initialTitle = getInitialTravelTitle({ days: travelPlanDays, type: "travelPlan" });

  const [title, setTitle] = useState(initialTitle);

  const onChangeTitle = (inputValue: string) => {
    const trimmedTitle = inputValue.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );

    setTitle(trimmedTitle);
  };

  return {
    state: {
      title,
      startDate,
      travelPlanDays,
    },
    handler: {
      onChangeTitle,
      onSelectCalendar,
      onAddDay,
      onAddPlace,
      onDeleteDay,
      onDeletePlace,
      onAddPlaceTodo,
      onDeletePlaceTodo,
      onChangeContent,
    },
  };
};

export default useTravelPlanForm;
