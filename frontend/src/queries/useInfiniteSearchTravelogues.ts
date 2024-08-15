import { useInfiniteQuery } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const getSearchTravelogues = async ({
  page,
  size,
  keyword,
}: {
  page: number;
  size: number;
  keyword: string;
}) => {
  const response = await authClient.get(API_ENDPOINT_MAP.searchTravelogues, {
    params: { page, size, keyword },
  });

  return response.data.content;
};

const useInfiniteSearchTravelogues = (keyword: string) => {
  const INITIAL_PAGE = 0;
  const DATA_LOAD_COUNT = 5;

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS_MAP.travelogue.search(keyword),
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size = DATA_LOAD_COUNT;
      return getSearchTravelogues({ page, size, keyword });
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
    travelogues: data?.pages || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfiniteSearchTravelogues;
