import { useInfiniteQuery } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { MyTravelogue } from "@components/pages/my/MyTravelogues/MyTravelogues";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const getMyTravelogues = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<MyTravelogue[]> => {
  try {
    const response = await authClient.get(API_ENDPOINT_MAP.myTravelogues, {
      params: { page, size },
    });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching my travelogues:", error);
    throw error;
  }
};

const useInfiniteMyTravelogues = () => {
  const INITIAL_PAGE = 0;
  const DATA_LOAD_COUNT = 5;

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS_MAP.travelogue.me(),
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size = DATA_LOAD_COUNT;
      return getMyTravelogues({ page, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
  });

  return {
    myTravelogues: data?.pages.flatMap((page) => page) || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfiniteMyTravelogues;
