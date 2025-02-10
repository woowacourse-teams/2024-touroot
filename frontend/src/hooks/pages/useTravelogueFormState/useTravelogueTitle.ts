import { useCallback, useState } from "react";

import { TravelTransformDays } from "@type/domain/travelTransform";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import getInitialTravelTitle from "@utils/getInitialTravelTitle";
import { validateTitle } from "@utils/validation/travelogue";

const useTravelogueTitle = (initialDays: TravelTransformDays[]) => {
  const [title, setTitle] = useState(
    getInitialTravelTitle({ days: initialDays, type: "travelogue" }),
  );
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  const handleChangeTitle = useCallback((title: string) => {
    const validationErrorMessage = validateTitle(title);

    if (validationErrorMessage) {
      setTitleErrorMessage(validationErrorMessage);
      return;
    }

    const newTitle = title.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );

    setTitle(newTitle);
    setTitleErrorMessage("");
  }, []);

  const isEnabledTravelogueTitle = titleErrorMessage === "" && title !== "";

  return { title, titleErrorMessage, isEnabledTravelogueTitle, handleChangeTitle };
};

export default useTravelogueTitle;
