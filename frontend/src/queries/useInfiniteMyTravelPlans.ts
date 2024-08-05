import { useInfiniteQuery } from "@tanstack/react-query";

import { authClient } from "@apis/client";

import { MyTravelPlans } from "@components/pages/my/MyTravelPlans/MyTravelPlans";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

const mockData: MyTravelPlans[] = [
  {
    id: "1234567890",
    title: "뚜리랑 도쿄 여행",
    startDate: "2023.01.11",
    endDate: "2023.01.14",
  },
  {
    id: "0987654321",
    title: "강 릉 긔 긔",
    startDate: "2023.04.03",
    endDate: "2023.04.05",
  },
];

export const getMockMyTravelPlans = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<MyTravelPlans[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const startIndex = page * size;
  const paginatedData = mockData.slice(startIndex, startIndex + size);

  return paginatedData;
};

export const getMyTravelPlans = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<MyTravelPlans[]> => {
  try {
    const response = await authClient.get(API_ENDPOINT_MAP.myTravelPlans, {
      params: { page, size },
    });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching my travel plans:", error);
    throw error;
  }
};

const useInfiniteMyTravelPlans = () => {
  const INITIAL_PAGE = 0;
  const DATA_LOAD_COUNT = 5;

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS_MAP.travelPlan.me(),
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size = DATA_LOAD_COUNT;
      return getMockMyTravelPlans({ page, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
  });

  return {
    myTravelPlans: data?.pages.flatMap((page) => page) || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfiniteMyTravelPlans;
