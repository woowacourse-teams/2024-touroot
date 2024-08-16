import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";
import { ROUTE_PATHS_MAP } from "@constants/route";
import { STORAGE_KEYS_MAP } from "@constants/storage";

const useDeleteTravelogue = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  return useMutation({
    mutationFn: (id: number) => authClient.delete(API_ENDPOINT_MAP.travelogueDetail(id)),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: QUERY_KEYS_MAP.travelogue.all,
          refetchType: "inactive",
        })
        .then(() => {
          navigation(ROUTE_PATHS_MAP.my);
          localStorage.setItem(STORAGE_KEYS_MAP.myPageSelectedTabIndex, JSON.stringify(1));
        });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

export default useDeleteTravelogue;
