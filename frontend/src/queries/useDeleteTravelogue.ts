import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

const useDeleteTravelogue = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  return useMutation({
    mutationFn: (id: number) => authClient.delete(API_ENDPOINT_MAP.travelogueDetail(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelogue.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.travelogue.me(),
        refetchType: "inactive",
      });
      navigation(-1);
    },
    onError: (error) => {
      alert(error);
    },
  });
};

export default useDeleteTravelogue;
