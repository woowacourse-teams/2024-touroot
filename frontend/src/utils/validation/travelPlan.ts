import type { TravelPlanDay } from "@type/domain/travelPlan";

import { FORM_ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

export const validateTitle = (title: string) => {
  if (title.length > FORM_VALIDATIONS_MAP.title.maxLength) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidTitleLength;
  }

  return null;
};

export const validateStartDate = (date: Date | null): string | null => {
  if (!date) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidStartDateMissing;
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (date < currentDate) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidStartDate;
  }

  return null;
};

export const validateDays = (days: TravelPlanDay[]) => {
  if (days.length < FORM_VALIDATIONS_MAP.days.min) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidDatesInfo;
  }

  if (days.some((day) => day.places.length === 0)) {
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidLocationInfo;
  }

  return null;
};

export const validateTodoContent = (content: string) => {
  if (content.length > FORM_VALIDATIONS_MAP.title.maxLength)
    return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidPlanLength;

  if (content.length === 0) return FORM_ERROR_MESSAGE_MAP.travelPlan.invalidPlanLength;

  return null;
};
