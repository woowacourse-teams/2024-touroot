export const SKELETON_COUNT = 5;
export const SORTING_OPTIONS = ["likeCount", "createdAt"] as const;
export const TRAVEL_PERIOD_OPTIONS = ["", "1", "2", "3", "4", "5", "6", "7", "8"] as const;

export const SORTING_OPTIONS_MAP = {
  likeCount: "좋아요순",
  createdAt: "최신순",
};
export const TRAVEL_PERIOD_OPTIONS_MAP = {
  "": "전체",
  1: "당일치기",
  2: "1박 2일",
  3: "2박 3일",
  4: "3박 4일",
  5: "4박 5일",
  6: "5박 6일",
  7: "6박 7일",
  8: "7박 이상",
};
