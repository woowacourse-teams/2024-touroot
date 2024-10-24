import { AxiosError, AxiosResponse } from "axios";
import { produce } from "immer";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorResponse } from "@type/api/errorResponse";
import { TraveloguePayload, TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

import { convertImageUrlConfig } from "@utils/queryFunction";

export const usePostTravelogue = () => {
  const queryClient = useQueryClient();

  const { isPaused, ...rest } = useMutation<
    AxiosResponse<TravelogueResponse, unknown>,
    ApiError | AxiosError<ErrorResponse>,
    TraveloguePayload,
    unknown
  >({
    mutationFn: (traveloguePayload) =>
      authClient.post(
        API_ENDPOINT_MAP.travelogues,
        produce(traveloguePayload, (newTraveloguePayload) => {
          newTraveloguePayload.days.forEach((day) => {
            day.places.forEach((place) => {
              place.photoUrls = place.photoUrls?.map(convertImageUrlConfig);
            });
          });
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelogue.me(),
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
