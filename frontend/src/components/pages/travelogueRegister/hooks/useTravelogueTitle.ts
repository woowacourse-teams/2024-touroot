import { useState } from "react";

import { TravelTransformDays } from "@type/domain/travelTransform";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import getInitialTravelTitle from "@utils/getInitialTravelTitle";

const useTravelogueTitle = (initialDays: TravelTransformDays[]) => {
  const [title, setTitle] = useState(
    getInitialTravelTitle({ days: initialDays, type: "travelogue" }),
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );
    setTitle(newTitle);
  };

  return { title, onChangeTitle };
};

export default useTravelogueTitle;
