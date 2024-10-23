import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

interface MutationFnVariables {
  nickname: string;
  profileImageUrl: string;
}

const usePutProfile = (onError: (error: Error) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nickname, profileImageUrl }: MutationFnVariables) =>
      authClient.put(API_ENDPOINT_MAP.profile, { nickname, profileImageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS_MAP.member.me(),
      });
    },
    onError,
  });
};

export default usePutProfile;
