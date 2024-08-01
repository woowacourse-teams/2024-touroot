import { useQuery } from "@tanstack/react-query";

import type { TravelogueResponse } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const useGetTravelogue = (id: string) => {
  return useQuery<TravelogueResponse>({
    queryKey: [`travelogues/${id}`],
    queryFn: async () => {
      const { data } = await client.get(`/travelogues/${id}`);

      return data;
    },
  });
};
