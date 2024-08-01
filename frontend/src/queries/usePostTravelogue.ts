import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import type { TravelRegister, TravelRegisterPlace } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelRegisterPlace & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TravelRegister,
    unknown
  >({
    mutationFn: (travelogue: TravelRegister) =>
      authClient.post(API_ENDPOINT_MAP.travelogues, travelogue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelogues"] });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
