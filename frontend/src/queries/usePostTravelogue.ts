import { AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TravelRegister, TravelRegisterPlace } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelRegisterPlace & { id: number }, unknown>,
    ApiError,
    TravelRegister,
    unknown
  >({
    mutationFn: (travelogue: TravelRegister) => authClient.post("/travelogues", travelogue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelogues"] });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
