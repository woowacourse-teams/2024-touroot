import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { TravelPlanPayload, TravelPlanResponse } from "@type/domain/travelPlan";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

interface MutationFnVariables {
  travelPlan: TravelPlanPayload;
  id: number;
}

export const usePutTravelPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelPlanResponse & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    MutationFnVariables,
    unknown
  >({
    mutationFn: ({ travelPlan, id }) =>
      authClient.put(API_ENDPOINT_MAP.travelPlanDetail(id) + "zz", {
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
        queryKey: QUERY_KEYS_MAP.travelPlan.all,
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
