import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { TravelPlanPayload, TravelPlanResponse } from "@type/domain/travelPlan";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const usePostTravelPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelPlanResponse & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TravelPlanPayload,
    unknown
  >({
    mutationFn: (travelPlan: TravelPlanPayload) =>
      authClient.post(API_ENDPOINT_MAP.travelPlans, travelPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelPlan.all,
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
