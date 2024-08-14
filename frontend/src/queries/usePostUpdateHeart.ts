import { AxiosError, AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ErrorResponse } from "@type/api/errorResponse";
import { TravelogueResponse } from "@type/domain/travelogue";

import ApiError from "@apis/ApiError";
import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const usePostUpdateHeart = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<Pick<TravelogueResponse, "likeCount" | "isLiked">>,
    ApiError | AxiosError<ErrorResponse>,
    string,
    unknown
  >({
    mutationFn: (id: string) => authClient.post(API_ENDPOINT_MAP.travelogueLike(id)),
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

export default usePostUpdateHeart;
