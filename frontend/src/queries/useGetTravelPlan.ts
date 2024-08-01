import { AxiosResponse } from "axios";

import { useQuery } from "@tanstack/react-query";

import type { TravelPlanResponse } from "@type/domain/travelPlan";

import { authClient } from "@apis/client";

export const useGetTravelPlan = (id: string) => {
  return useQuery<AxiosResponse<TravelPlanResponse>>({
    queryKey: [`travel-plans/${id}`],
    queryFn: async () => authClient.get(`travel-plans/${id}`),
  });
};
