import { useQuery } from "@tanstack/react-query";

import { Travelogue } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const useGetTravelogue = (id: string) => {
  return useQuery<Travelogue>({
    queryKey: [`travelogues/${id}`],
    queryFn: async () => {
      const { data } = await client.get(`/travelogues/${id}`);
      return data;
    },
  });
};
