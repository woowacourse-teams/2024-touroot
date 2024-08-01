import { useQuery } from "@tanstack/react-query";

import type { Travelogue } from "@type/domain/travelogue";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";

export const useGetTravelogue = (id: string) => {
  return useQuery<Travelogue>({
    queryKey: [`travelogues/${id}`],
    queryFn: async () => {
      const { data } = await client.get(API_ENDPOINT_MAP.travelogue(Number(id)));

      return data;
    },
  });
};
