import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import type { TravelPlanResponse } from "@type/domain/travelPlan";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const useGetTravelPlan = (id: string) => {
  return useQuery<AxiosResponse<TravelPlanResponse>>({
    queryKey: QUERY_KEYS_MAP.travelPlan.detail(id),
    queryFn: async () => authClient.get(API_ENDPOINT_MAP.travelPlanDetail(Number(id))),
  });
};
