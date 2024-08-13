import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

const usePutNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => authClient.put(API_ENDPOINT_MAP.modifyNickname, { nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.member.me(),
        refetchType: "inactive",
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default usePutNickname;
