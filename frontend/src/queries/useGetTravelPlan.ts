import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import { Travelogue } from "@type/domain/travelogue";

import { authClient } from "@apis/client";

export const useGetTravelPlan = (id: string) => {
  return useQuery<AxiosResponse<Travelogue>>({
    queryKey: [`travel-plans/${id}`],
    queryFn: async () => authClient.get(`travel-plans/${id}`),
  });
};
