import type { SearchType } from "@type/domain/travelogue";

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
    search: (keyword: string, searchType: SearchType) => [
      ...QUERY_KEYS_MAP.travelogue.all,
      searchType,
      keyword,
    ],
    tag: (selectedTagIDs: number[]) => [...QUERY_KEYS_MAP.travelogue.all, ...selectedTagIDs],
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
