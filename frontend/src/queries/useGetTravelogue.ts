import { useQuery } from "@tanstack/react-query";

import type { TravelogueResponse } from "@type/domain/travelogue";

import { client } from "@apis/client";

import useUser from "@hooks/useUser";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const useGetTravelogue = (id: string) => {
  const { user } = useUser();

  const authorizationHeaderConfig = user?.accessToken
    ? {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    : null;

  return useQuery<TravelogueResponse>({
    queryKey: QUERY_KEYS_MAP.travelogue.detail(id),
    queryFn: async () => {
      const { data } = await client.get(API_ENDPOINT_MAP.travelogueDetail(id), {
        ...authorizationHeaderConfig,
      });

      return data;
    },
    retry: 0,
  });
};
