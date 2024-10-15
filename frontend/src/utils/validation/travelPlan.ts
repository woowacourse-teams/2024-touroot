import { FORM_ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

export const validateTitle = (title: string) => {
  if (title.length > FORM_VALIDATIONS_MAP.title.maxLength) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidTitleLength;
  }

  return null;
};
