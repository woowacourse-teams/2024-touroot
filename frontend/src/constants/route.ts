export const ROUTE_PATHS = {
  root: "/",
  travelogue: "/travelogue/:id",
  travelogueRegister: "/travelogue/register",
  travelPlans: "/travel-plans/:id",
  travelPlansRegister: "/travel-plans/register",
  login: "/login",
  loginCallback: "/oauth",
  loginOauth: "/login/oauth/kakao",
} as const;
