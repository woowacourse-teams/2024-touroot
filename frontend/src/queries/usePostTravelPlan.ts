import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import type { TravelRegister, TravelRegisterPlace } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

export const usePostTravelPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelRegisterPlace & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    Omit<TravelRegister, "thumbnail"> & { startDate: string },
    unknown
  >({
    mutationFn: (travelPlan: Omit<TravelRegister, "thumbnail"> & { startDate: string }) =>
      authClient.post("/travel-plans", travelPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
