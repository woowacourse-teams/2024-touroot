import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import type { TravelPlanTodo } from "@type/domain/travelPlan";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

interface PatchTodoParams {
  todoId: string;
  checked: boolean;
}

export const usePatchTravelPlanTodo = (travelPlanId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelPlanTodo>,
    ApiError | AxiosError<ErrorResponse>,
    PatchTodoParams,
    unknown
  >({
    mutationFn: ({ todoId, checked }) =>
      authClient.patch(API_ENDPOINT_MAP.todos(todoId), { checked }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelPlan.detail(travelPlanId),
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
