import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import type { TravelPlanResponse } from "@type/domain/travelPlan";

import { authClient, client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

import { isUUID } from "@utils/uuid";

export const useGetTravelPlan = (id: string) => {
  return useQuery<AxiosResponse<TravelPlanResponse>>({
    queryKey: QUERY_KEYS_MAP.travelPlan.detail(id),
    queryFn: async () => {
      return isUUID(id)
        ? client.get(API_ENDPOINT_MAP.sharedTravelPlanDetail(id))
        : authClient.get(API_ENDPOINT_MAP.travelPlanDetail(id));
    },
  });
};
