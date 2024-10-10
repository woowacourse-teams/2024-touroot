import { TravelTransformDays } from "@type/domain/travelTransform";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";
import useTravelPlanStartDate from "@hooks/pages/useTravelPlanFormState/useTravelPlanStartDate";
import useTravelPlanTitle from "@hooks/pages/useTravelPlanFormState/useTravelPlanTitle";

const useTravelPlanFormState = (transformDays: TravelTransformDays[]) => {
  const {
    travelPlanDays,
    onChangeTravelPlanDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onDeletePlace,
    onAddPlaceTodo,
    onDeletePlaceTodo,
    onChangeContent,
  } = useTravelPlanDays(transformDays);

  const { startDate, onInitializeStartDate, onSelectStartDate } = useTravelPlanStartDate();

  const { title, onChangeTitle } = useTravelPlanTitle(travelPlanDays);

  return {
    state: {
      title,
      startDate,
      travelPlanDays,
    },
    handler: {
      onChangeTravelPlanDays,
      onChangeTitle,
      onSelectStartDate,
      onInitializeStartDate,
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

export default useTravelPlanFormState;
