import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TravelRegister } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (travelogue: TravelRegister) => client.post("/travelogues", travelogue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelogues"] });
    },
  });
};
