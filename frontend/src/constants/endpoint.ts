export const API_ENDPOINT_MAP = {
  loginOauth: (code: string) => `/login/oauth/kakao?code=${code}`,
  travelogue: (id: number) => `/travelogues/${id}`,
  travelPlan: (id: number) => `travel-plans/${id}`,
  travelogues: "/travelogues",
  travelPlans: "/travel-plans",
  image: "/image",
} as const;
