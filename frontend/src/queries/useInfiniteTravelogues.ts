import { useInfiniteQuery } from "@tanstack/react-query";

import { SortingOption, TravelPeriodOption } from "@type/domain/travelogue";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const getTravelogues = async ({
  page,
  size,
  // sort,
  period,
  tag,
}: {
  page: number;
  size: number;
  // sort: string;
  period?: TravelPeriodOption;
  tag?: string;
}) => {
  const response = await client.get(API_ENDPOINT_MAP.travelogues, {
    params: { page, size, period, tag },
  });

  return response.data;
};

const INITIAL_PAGE = 0;
const DATA_LOAD_COUNT = 5;

const useInfiniteTravelogues = (
  selectedTagIDs: number[],
  selectedSortingOption: SortingOption,
  selectedTravelPeriodOption: TravelPeriodOption,
) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage, isPaused } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS_MAP.travelogue.tag(
        selectedTagIDs,
        selectedSortingOption,
        selectedTravelPeriodOption,
      ),
      queryFn: ({ pageParam = INITIAL_PAGE }) => {
        const page = pageParam;
        const size = DATA_LOAD_COUNT;
        // const sort = `${selectedSortingOption},desc`;
        const period = selectedTravelPeriodOption || undefined;
        const tag = selectedTagIDs.length > 0 ? [...selectedTagIDs].join(",") : undefined;

        return getTravelogues({ page, size, period, tag });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.content.length ? allPages.length : undefined;
        return nextPage;
      },
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.content),
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
    isPaused,
  };
};

export default useInfiniteTravelogues;
