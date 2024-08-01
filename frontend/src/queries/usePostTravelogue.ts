import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import { TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<TravelogueResponse & { id: number }, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TravelogueResponse,
    unknown
  >({
    mutationFn: (travelogue: TravelogueResponse) =>
      authClient.post("/travelogues", {
        ...travelogue,
        days: travelogue.days.map((day) => ({
          ...day,
          places: day.places.map((place) => ({
            ...place,
            photoUrls: place.photoUrls?.map((url) => ({ url })),
          })),
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelogues"] });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
