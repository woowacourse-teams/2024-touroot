export const API_ENDPOINT_MAP = {
  loginOauth: (code: string) => `/login/oauth/kakao?code=${code}`,
  travelogueDetail: (id: string) => `/travelogues/${id}`,
  travelPlanDetail: (id: string) => `travel-plans/${id}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
} as const;
