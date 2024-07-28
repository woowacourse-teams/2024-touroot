import { AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TravelRegister, TravelRegisterPlace } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const usePostTravelPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelRegisterPlace & { id: number }, unknown>,
    Error,
    Omit<TravelRegister, "thumbnail"> & { startDate: string },
    unknown
  >({
    mutationFn: (travelPlan: Omit<TravelRegister, "thumbnail"> & { startDate: string }) =>
      client.post("/travel-plans", travelPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
    },
  });
};
