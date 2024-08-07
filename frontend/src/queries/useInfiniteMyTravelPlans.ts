import { useInfiniteQuery } from "@tanstack/react-query";

import type { TravelPlanResponse } from "@type/domain/travelPlan";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const getMyTravelPlans = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<TravelPlanResponse[]> => {
  const response = await authClient.get(API_ENDPOINT_MAP.myTravelPlans, {
    params: { page, size },
  });

  return response.data.content;
};

const useInfiniteMyTravelPlans = () => {
  const INITIAL_PAGE = 0;
  const DATA_LOAD_COUNT = 5;

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS_MAP.travelPlan.me(),
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size = DATA_LOAD_COUNT;
      return getMyTravelPlans({ page, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page),
      pageParams: data.pageParams,
    }),
  });

  return {
    myTravelPlans: data?.pages || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfiniteMyTravelPlans;
