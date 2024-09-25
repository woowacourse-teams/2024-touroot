import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { css } from "@emotion/react";

import { Spinner, Text } from "@components/common";
import AppLayout from "@components/layout/AppLayout/AppLayout";
import KakaoCallbackPage from "@components/pages/login/KakaoCallbackPage";
import LoginPage from "@components/pages/login/LoginPage";
import MainPage from "@components/pages/main/MainPage";
import MyPage from "@components/pages/my/MyPage";
import NotFoundPage from "@components/pages/notFound/NotFoundPage";
import TravelPlanDetailPage from "@components/pages/travelPlanDetail/TravelPlanDetailPage";
import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";

import { ROUTE_PATHS_MAP } from "./constants/route";

const TravelogueRegisterPage = lazy(
  () => import("@components/pages/travelogueRegister/TravelogueRegisterPage"),
);
const TravelogueEditPage = lazy(
  () => import("@components/pages/travelogueEdit/TravelogueEditPage"),
);
const TravelPlanRegisterPage = lazy(
  () => import("@components/pages/travelPlanRegister/TravelPlanRegisterPage"),
);
const TravelPlanEditPage = lazy(
  () => import("@components/pages/travelPlanEdit/TravelPlanEditPage"),
);
const SearchPage = lazy(() => import("@components/pages/search/SearchPage"));

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
        element: <MainPage />,
      },
      {
        path: ROUTE_PATHS_MAP.login,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATHS_MAP.loginCallback,
        element: <KakaoCallbackPage />,
      },
      {
        path: ROUTE_PATHS_MAP.travelogue(),
        element: <TravelogueDetailPage />,
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
        element: <TravelPlanDetailPage />,
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
        element: <MyPage />,
      },
      {
        path: ROUTE_PATHS_MAP.searchMain,
        element: <SearchPage />,
      },
      {
        path: ROUTE_PATHS_MAP.search(),
        element: withLazyLoading(SearchPage),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
