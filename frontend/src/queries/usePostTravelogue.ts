import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import { TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS_MAP.travelogue.all });
    },
    onError: (error) => {
      alert(error);
    },
  });
};
