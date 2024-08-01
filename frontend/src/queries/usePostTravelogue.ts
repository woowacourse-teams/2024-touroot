import { AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { TravelRegister, TravelRegisterPlace } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelRegisterPlace & { id: number }, unknown>,
    Error,
    TravelRegister,
    unknown
  >({
    mutationFn: (travelogue: TravelRegister) => client.post("/travelogues", travelogue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelogues"] });
    },
  });
};
