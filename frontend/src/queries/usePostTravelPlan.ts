import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { TravelPlanPayload, TravelPlanResponse } from "@type/domain/travelPlan";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const usePostTravelPlan = () => {
  const queryClient = useQueryClient();

  const { isPaused, ...rest } = useMutation<
    AxiosResponse<TravelPlanResponse & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TravelPlanPayload,
    unknown
  >({
    mutationFn: (travelPlan: TravelPlanPayload) =>
      authClient.post(API_ENDPOINT_MAP.travelPlans, {
        ...travelPlan,
        days: travelPlan.days.map((day) => {
          return {
            ...day,
            places: day.places.map((place) => {
              return {
                ...place,
                todos: place.todos?.map((todo) => {
                  return {
                    ...todo,
                    isChecked: todo.checked,
                  };
                }),
              };
            }),
          };
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelPlan.me(),
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return { isPaused, ...rest };
};
