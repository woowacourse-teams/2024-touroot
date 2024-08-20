import { useQuery } from "@tanstack/react-query";

import type { Tag } from "@type/domain/travelogue";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

const useGetTags = () => {
  return useQuery<Tag[]>({
    queryKey: QUERY_KEYS_MAP.tags.all,
    queryFn: async () => {
      const { data } = await client.get(API_ENDPOINT_MAP.tags);

      return data;
    },
    retry: 0,
  });
};

export default useGetTags;
