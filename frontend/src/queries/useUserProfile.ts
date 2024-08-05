import { useQuery } from "@tanstack/react-query";

import type { UserResponse } from "@type/domain/user";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const useUserProfile = () => {
  return useQuery<UserResponse>({
    queryKey: QUERY_KEYS_MAP.member.me(),
    queryFn: async () => {
      const { data } = await authClient.get(API_ENDPOINT_MAP.profile);

      return data;
    },
  });
};
