import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import { TraveloguePayload, TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();
  const { isPaused, ...rest } = useMutation<
    AxiosResponse<TravelogueResponse, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TraveloguePayload,
    unknown
  >({
    mutationFn: (travelogue: TraveloguePayload) =>
      authClient.post(API_ENDPOINT_MAP.travelogues, {
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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelogue.all,
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return { isPaused, ...rest };
};
