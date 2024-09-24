import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { css } from "@emotion/react";

import { Text } from "@components/common";
import Spinner from "@components/common/Spinner/Spinner";
import AppLayout from "@components/layout/AppLayout/AppLayout";

import { ROUTE_PATHS_MAP } from "./constants/route";

const MainPage = lazy(() => import("@components/pages/main/MainPage"));
const LoginPage = lazy(() => import("@components/pages/login/LoginPage"));
const KakaoCallbackPage = lazy(() => import("@components/pages/login/KakaoCallbackPage"));
const TravelogueDetailPage = lazy(
  () => import("@components/pages/travelogueDetail/TravelogueDetailPage"),
);
const TravelogueRegisterPage = lazy(
  () => import("@components/pages/travelogueRegister/TravelogueRegisterPage"),
);
const TravelogueEditPage = lazy(
  () => import("@components/pages/travelogueEdit/TravelogueEditPage"),
);
const TravelPlanDetailPage = lazy(
  () => import("@components/pages/travelPlanDetail/TravelPlanDetailPage"),
);
const TravelPlanRegisterPage = lazy(
  () => import("@components/pages/travelPlanRegister/TravelPlanRegisterPage"),
);
const TravelPlanEditPage = lazy(
  () => import("@components/pages/travelPlanEdit/TravelPlanEditPage"),
);
const MyPage = lazy(() => import("@components/pages/my/MyPage"));
const SearchPage = lazy(() => import("@components/pages/search/SearchPage"));
const NotFoundPage = lazy(() => import("@components/pages/notFound/NotFoundPage"));

const lazyLoadingFallbackStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 48rem;
  gap: 1rem;
`;

const withLazyLoading = (Component: React.ComponentType) => (
  <Suspense
    fallback={
      <div css={lazyLoadingFallbackStyle}>
        <Spinner />
        <Text textType="bodyBold">로딩 중이에요. 잠시만 기다려주세요 :)</Text>
      </div>
    }
  >
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS_MAP.root,
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATHS_MAP.root,
        element: withLazyLoading(MainPage),
      },
      {
        path: ROUTE_PATHS_MAP.login,
        element: withLazyLoading(LoginPage),
      },
      {
        path: ROUTE_PATHS_MAP.loginCallback,
        element: withLazyLoading(KakaoCallbackPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelogue(),
        element: withLazyLoading(TravelogueDetailPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelogueRegister,
        element: withLazyLoading(TravelogueRegisterPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelogueEdit(),
        element: withLazyLoading(TravelogueEditPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelPlan(),
        element: withLazyLoading(TravelPlanDetailPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelPlanRegister,
        element: withLazyLoading(TravelPlanRegisterPage),
      },
      {
        path: ROUTE_PATHS_MAP.travelPlanEdit(),
        element: withLazyLoading(TravelPlanEditPage),
      },
      {
        path: ROUTE_PATHS_MAP.my,
        element: withLazyLoading(MyPage),
      },
      {
        path: ROUTE_PATHS_MAP.searchMain,
        element: withLazyLoading(SearchPage),
      },
      {
        path: ROUTE_PATHS_MAP.search(),
        element: withLazyLoading(SearchPage),
      },
      {
        path: "*",
        element: withLazyLoading(NotFoundPage),
      },
    ],
  },
]);
