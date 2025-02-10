import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchType, SortingOption, TravelPeriodOption } from "@type/domain/travelogue";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { QUERY_KEYS_MAP } from "@constants/queryKey";

export const getTravelogues = async ({
  page,
  size,
  sort,
  period,
  tag,
  keyword,
  searchType,
}: {
  page: number;
  size: number;
  sort: string;
  period?: TravelPeriodOption;
  tag?: string;
  keyword?: string;
  searchType?: SearchType;
}) => {
  const response = await client.get(API_ENDPOINT_MAP.travelogues, {
    params: { page, size, sort, period, tag, keyword, searchType },
  });

  return response.data;
};

const INITIAL_PAGE = 0;
const DATA_LOAD_COUNT = 5;

const useInfiniteTravelogues = ({
  selectedTagIDs,
  selectedSortingOption,
  selectedTravelPeriodOption,
  keyword,
  searchType,
}: {
  selectedTagIDs: number[];
  selectedSortingOption: SortingOption;
  selectedTravelPeriodOption: TravelPeriodOption;
  keyword?: string;
  searchType?: SearchType;
}) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage, isPaused } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS_MAP.travelogue.tag({
        selectedTagIDs,
        selectedSortingOption,
        selectedTravelPeriodOption,
        keyword,
        searchType,
      }),
      queryFn: ({ pageParam = INITIAL_PAGE }) => {
        const page = pageParam;
        const size = DATA_LOAD_COUNT;
        const sort = `${selectedSortingOption},desc`;
        const period = selectedTravelPeriodOption || undefined;
        const tag = selectedTagIDs.length > 0 ? [...selectedTagIDs].join(",") : undefined;

        return getTravelogues({ page, size, sort, period, tag, keyword, searchType });
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
