import { useQuery } from "@tanstack/react-query";

import type { TravelPlanResponse } from "@type/domain/travelPlan";

import { authClient, client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

import { isUUID } from "@utils/uuid";

export const useGetTravelPlan = (id: string) => {
  return useQuery<TravelPlanResponse>({
    queryKey: QUERY_KEYS_MAP.travelPlan.detail(id),
    queryFn: async () => {
      const { data } = isUUID(id)
        ? await client.get(API_ENDPOINT_MAP.sharedTravelPlanDetail(id))
        : await authClient.get(API_ENDPOINT_MAP.travelPlanDetail(id));

      return data;
    },
    retry: 0,
  });
};
