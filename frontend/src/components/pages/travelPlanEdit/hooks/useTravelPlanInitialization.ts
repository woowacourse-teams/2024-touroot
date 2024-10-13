import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import useTravelPlanFormState from "@hooks/pages/useTravelPlanFormState/useTravelPlanFormState";

type UseTravelPlanInitialization = Pick<
  ReturnType<typeof useTravelPlanFormState>["handler"],
  "handleChangeTitle" | "handleInitializeStartDate" | "handleChangeTravelPlanDays"
>;

export const useTravelPlanInitialization = ({
  handleChangeTitle,
  handleInitializeStartDate,
  handleChangeTravelPlanDays,
}: UseTravelPlanInitialization) => {
  const { id = "" } = useParams();

  const { data, status, error, isLoading } = useGetTravelPlan(id);
  useEffect(() => {
    if (data) {
      handleChangeTitle(data.title);
      handleInitializeStartDate(data.startDate);
      handleChangeTravelPlanDays(data.days);
    }
  }, [data, handleChangeTitle, handleChangeTravelPlanDays, handleInitializeStartDate]);

  return { status, error, isLoading };
};
