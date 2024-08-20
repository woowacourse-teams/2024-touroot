import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import { TraveloguePayload, TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

interface MutationFnVariables {
  travelogue: TraveloguePayload;
  id: number;
}

export const usePutTravelogue = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<TravelogueResponse, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    MutationFnVariables,
    unknown
  >({
    mutationFn: ({ travelogue, id }) =>
      authClient.put(API_ENDPOINT_MAP.travelogueDetail(id), {
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
};