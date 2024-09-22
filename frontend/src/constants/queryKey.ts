import { SortingOption, TravelPeriodOption } from "@type/domain/travelogue";

export const QUERY_KEYS_MAP = {
  travelogue: {
    all: ["travelogues"],
    detail: (id: string) => [...QUERY_KEYS_MAP.travelogue.all, id],
    member: (userIdentifier: string) => [
      ...QUERY_KEYS_MAP.travelogue.all,
      "member",
      userIdentifier,
    ],
    me: () => [...QUERY_KEYS_MAP.travelogue.member("me")],
    search: (keyword: string) => [...QUERY_KEYS_MAP.travelogue.all, keyword],
    tag: (
      selectedTagIDs: number[],
      selectedSortingOption: SortingOption,
      selectedTravelPeriodOption: TravelPeriodOption,
    ) => [
      ...QUERY_KEYS_MAP.travelogue.all,
      ...selectedTagIDs,
      selectedSortingOption,
      selectedTravelPeriodOption,
    ],
  },
  travelPlan: {
    all: ["travel-plans"],
    detail: (id: string) => [...QUERY_KEYS_MAP.travelPlan.all, id],
    member: (userIdentifier: string) => [
      ...QUERY_KEYS_MAP.travelPlan.all,
      "member",
      userIdentifier,
    ],
    me: () => [...QUERY_KEYS_MAP.travelPlan.member("me")],
  },
  member: {
    all: ["member"],
    me: () => [...QUERY_KEYS_MAP.member.all, "me"],
  },
  tags: {
    all: ["tags"],
  },
};
