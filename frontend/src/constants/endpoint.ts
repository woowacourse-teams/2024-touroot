export const API_ENDPOINT_MAP = {
  loginOauth: (code: string) => `/login/oauth/kakao?code=${code}`,
  travelogueDetail: (id: number) => `/travelogues/${id}`,
  travelPlanDetail: (id: number) => `travel-plans/${id}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
} as const;
