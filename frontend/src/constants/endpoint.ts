export const API_ENDPOINT_MAP = {
  loginOauth: (code: string, redirectUri: string) =>
    `/login/oauth/kakao?code=${code}&redirectUri=${redirectUri}`,
  travelogueDetail: (id: number) => `/travelogues/${id}`,
  travelPlanDetail: (id: number) => `travel-plans/${id}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
  profile: "member/me/profile",
} as const;
