export const QUERY_KEYS_MAP = {
  travelogue: {
    all: ["travelogues"],
    detail: (id: string) => [...QUERY_KEYS_MAP.travelogue.all, id],
  },
  travelPlan: {
    all: ["travel-plans"],
    detail: (id: string) => [...QUERY_KEYS_MAP.travelPlan.all, id],
  },
  member: {
    all: ["member"],
    me: () => [...QUERY_KEYS_MAP.member.all, "me"],
  },
};
