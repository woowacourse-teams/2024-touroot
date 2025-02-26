import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@components/layout/AppLayout/AppLayout";
import LandingPage from "@components/pages/landing/LandingPage";
import KakaoCallbackPage from "@components/pages/login/KakaoCallbackPage";
import LoginPage from "@components/pages/login/LoginPage";
import MainPage from "@components/pages/main/MainPage";
import MyPage from "@components/pages/my/MyPage";
import NotFoundPage from "@components/pages/notFound/NotFoundPage";
import SearchPage from "@components/pages/search/SearchPage";
import TravelPlanDetailPage from "@components/pages/travelPlanDetail/TravelPlanDetailPage";
import TravelPlanEditPage from "@components/pages/travelPlanEdit/TravelPlanEditPage";
import TravelPlanRegisterPage from "@components/pages/travelPlanRegister/TravelPlanRegisterPage";
import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";
import TravelogueEditPage from "@components/pages/travelogueEdit/TravelogueEditPage";
import TravelogueRegisterPage from "@components/pages/travelogueRegister/TravelogueRegisterPage";

import { ROUTE_PATHS_MAP } from "./constants/route";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS_MAP.root,
    element: <LandingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATHS_MAP.root,
        element: <LandingPage />,
      },
      {
        path: ROUTE_PATHS_MAP.main,
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
        element: <TravelogueRegisterPage />,
      },
      {
        path: ROUTE_PATHS_MAP.travelogueEdit(),
        element: <TravelogueEditPage />,
      },
      {
        path: ROUTE_PATHS_MAP.travelPlan(),
        element: <TravelPlanDetailPage />,
      },
      {
        path: ROUTE_PATHS_MAP.travelPlanRegister,
        element: <TravelPlanRegisterPage />,
      },
      {
        path: ROUTE_PATHS_MAP.travelPlanEdit(),
        element: <TravelPlanEditPage />,
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
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
