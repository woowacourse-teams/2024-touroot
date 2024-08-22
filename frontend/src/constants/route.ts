export const ROUTE_PATHS_MAP = {
  back: -1,
  root: "/",
  travelogue: (id?: number | string) => (id ? `/travelogue/${id}` : "/travelogue/:id"),
  travelPlan: (id?: number | string) => (id ? `/travel-plan/${id}` : "/travel-plan/:id"),
  travelogueRegister: "/travelogue/register",
  travelPlanRegister: "/travel-plan/register",
  travelogueEdit: (id?: number | string) =>
    id ? `/travelogue/${id}/edit` : "/travelogue/:id/edit",
  travelPlanEdit: (id?: number | string) =>
    id ? `/travel-plan/${id}/edit` : "/travel-plan/:id/edit",
  login: "/login",
  loginCallback: "/oauth",
  loginOauth: "/login/oauth/kakao",
  my: "/my",
  searchMain: "/search",
  search: (keyword?: string) => (keyword ? `/search/${keyword}` : "/search/:id"),
} as const;
