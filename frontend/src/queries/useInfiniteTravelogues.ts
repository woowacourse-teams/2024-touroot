import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@apis/client";

export const getTravelogues = async ({ page, size }: { page: number; size: number }) => {
  try {
    const response = await client.get("/travelogues", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching travelogues:", error);
    throw error;
  }
};

const useInfiniteTravelogues = () => {
  const INITIAL_PAGE = 0;
  const DATA_LOAD_COUNT = 5;

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["travelogues"],
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size = DATA_LOAD_COUNT;
      return getTravelogues({ page, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.content.length ? allPages.length : undefined;
      return nextPage;
    },
  });

  return {
    travelogues: data?.pages.flatMap((page) => page.content) || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfiniteTravelogues;
