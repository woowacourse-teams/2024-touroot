export const API_ENDPOINT_MAP = {
  loginOauth: (code: string, redirectUri: string) =>
    `/login/oauth/kakao?code=${code}&redirectUri=${redirectUri}`,
  travelogueDetail: (id: number | string) => `/travelogues/${id}`,
  travelPlanDetail: (id: number | string) => `/travel-plans/${id}`,
  sharedTravelPlanDetail: (uuid: string) => `/travel-plans/shared/${uuid}`,
  travelogueLike: (id: number | string) => `${API_ENDPOINT_MAP.travelogueDetail(id)}/like`,
  todos: (todoId: string) => `/todos/${todoId}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
  profile: "/member/me/profile",
  myTravelogues: "/member/me/travelogues",
  myTravelPlans: "/member/me/travel-plans",
  myLikes: "/member/me/likes",
  searchTravelogues: "/travelogues/search",
  reissueToken: "/login/reissue-token",
  tags: "/tags",
} as const;
