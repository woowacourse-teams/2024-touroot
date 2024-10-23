import { TravelTransformDays } from "@type/domain/travelTransform";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanFormState/useTravelPlanDays";
import useTravelPlanStartDate from "@hooks/pages/useTravelPlanFormState/useTravelPlanStartDate";
import useTravelPlanTitle from "@hooks/pages/useTravelPlanFormState/useTravelPlanTitle";

const useTravelPlanFormState = (transformDays: TravelTransformDays[]) => {
  const {
    travelPlanDays,
    travelPlanDaysErrorMessage,
    todoErrorMessages,
    isEnabledTravelPlanDays,
    handleChangeTravelPlanDays,
    handleAddDay,
    handleAddPlace,
    handleDeleteDay,
    handleDeletePlace,
    handleAddPlaceTodo,
    handleDeletePlaceTodo,
    handleChangeContent,
  } = useTravelPlanDays(transformDays);

  const {
    startDate,
    startDateErrorMessage,
    isEnabledStartDate,
    handleInitializeStartDate,
    handleSelectStartDate,
  } = useTravelPlanStartDate();

  const { title, isEnabledTravelogueTitle, titleErrorMessage, handleChangeTitle } =
    useTravelPlanTitle(travelPlanDays);

  const isEnabledForm = isEnabledTravelogueTitle && isEnabledStartDate && isEnabledTravelPlanDays;

  return {
    state: {
      title,
      startDate,
      travelPlanDays,
    },
    handler: {
      handleChangeTravelPlanDays,
      handleChangeTitle,
      handleSelectStartDate,
      handleInitializeStartDate,
      handleAddDay,
      handleAddPlace,
      handleDeleteDay,
      handleDeletePlace,
      handleAddPlaceTodo,
      handleDeletePlaceTodo,
      handleChangeContent,
    },
    errorMessages: {
      titleErrorMessage,
      startDateErrorMessage,
      travelPlanDaysErrorMessage,
      todoErrorMessages,
    },
    isEnabledForm,
  };
};

export default useTravelPlanFormState;
