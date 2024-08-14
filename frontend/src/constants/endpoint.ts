export const API_ENDPOINT_MAP = {
  loginOauth: (code: string, redirectUri: string) =>
    `/login/oauth/kakao?code=${code}&redirectUri=${redirectUri}`,
  travelogueDetail: (id: number | string) => `/travelogues/${id}`,
  travelPlanDetail: (id: number | string) => `/travel-plans/${id}`,
  sharedTravelPlanDetail: (uuid: string) => `/travel-plans/shared/${uuid}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
  profile: "/member/me/profile",
  myTravelogues: "/member/me/travelogues",
  myTravelPlans: "/member/me/travel-plans",
  reissueToken: "/login/reissue-token",
} as const;
