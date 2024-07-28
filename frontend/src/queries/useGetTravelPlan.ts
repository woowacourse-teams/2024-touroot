import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import { Travelogue } from "@type/domain/travelogue";

import { client } from "@apis/client";

export const useGetTravelPlan = (id: string, accessToken: string) => {
  return useQuery<AxiosResponse<Travelogue>>({
    queryKey: [`travel-plans/${id}`],
    queryFn: async () =>
      client.get(`travel-plans/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  });
};
