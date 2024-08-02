import { useQuery } from "@tanstack/react-query";

import type { Travelogue } from "@type/domain/travelogue";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const useGetTravelogue = (id: string) => {
  return useQuery<Travelogue>({
    queryKey: QUERY_KEYS_MAP.travelogue.detail(id),
    queryFn: async () => {
      const { data } = await client.get(API_ENDPOINT_MAP.travelogueDetail(Number(id)));

      return data;
    },
  });
};
