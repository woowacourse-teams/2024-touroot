import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetTravelPlan } from "@queries/useGetTravelPlan";

import useTravelPlanFormState from "@hooks/pages/useTravelPlanFormState/useTravelPlanFormState";

type UseTravelPlanInitialization = Pick<
  ReturnType<typeof useTravelPlanFormState>["handler"],
  "onChangeTitle" | "onInitializeStartDate" | "onChangeTravelPlanDays"
>;

export const useTravelPlanInitialization = ({
  onChangeTitle,
  onInitializeStartDate,
  onChangeTravelPlanDays,
}: UseTravelPlanInitialization) => {
  const { id = "" } = useParams();

  const { data, status, error, isLoading } = useGetTravelPlan(id);
  useEffect(() => {
    if (data) {
      onChangeTitle(data.title);
      onInitializeStartDate(data.startDate);
      onChangeTravelPlanDays(data.days);
    }
  }, [data, onChangeTitle, onChangeTravelPlanDays, onInitializeStartDate]);

  return { status, error, isLoading };
};
