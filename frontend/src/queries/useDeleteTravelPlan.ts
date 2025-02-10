import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { QUERY_KEYS_MAP } from "@constants/queryKey";
import { ROUTE_PATHS_MAP } from "@constants/route";

const useDeleteTravelPlan = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const { isPaused, ...rest } = useMutation({
    mutationFn: (id: number) => authClient.delete(API_ENDPOINT_MAP.travelPlanDetail(id)),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: QUERY_KEYS_MAP.travelPlan.me(),
          refetchType: "inactive",
        })
        .then(() => navigation(ROUTE_PATHS_MAP.my));
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return { isPaused, ...rest };
};

export default useDeleteTravelPlan;
