import { Travelogue } from "types/domain/travelogue";

import { useMutation } from "@tanstack/react-query";

import { client } from "@apis/client";

export const useRegisterTravelogue = () => {
  return useMutation({
    mutationFn: (travelogue: Travelogue) => client.post("/travelogues", travelogue),
    onSuccess: () => {
      //TODO: 여행기 관련 캐시 무효화 추가해야함
    },
  });
};
