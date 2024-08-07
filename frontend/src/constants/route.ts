export const ROUTE_PATHS_MAP = {
  back: -1,
  root: "/",
  travelogue: (id?: number | string) => (id ? `/travelogue/${id}` : "/travelogue/:id"),
  travelPlan: (id?: number | string) => (id ? `/travel-plan/${id}` : "/travel-plan/:id"),
  travelogueRegister: "/travelogue/register",
  travelPlanRegister: "/travel-plan/register",
  login: "/login",
  loginCallback: "/oauth",
  loginOauth: "/login/oauth/kakao",
  my: "/my",
} as const;
