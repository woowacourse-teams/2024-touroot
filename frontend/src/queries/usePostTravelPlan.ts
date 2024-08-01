import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { TravelPlanResponse } from "@type/domain/travelPlan";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

export const usePostTravelPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelPlanResponse & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TravelPlanResponse,
    unknown
  >({
    mutationFn: (travelPlan: TravelPlanResponse) => authClient.post("/travel-plans", travelPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
