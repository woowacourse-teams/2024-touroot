import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import { Travelogue } from "@type/domain/travelogue";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";

export const useGetTravelPlan = (id: string) => {
  return useQuery<AxiosResponse<Travelogue>>({
    queryKey: [`travel-plans/${id}`],
    queryFn: async () => authClient.get(API_ENDPOINT_MAP.travelPlan(Number(id))),
  });
};
