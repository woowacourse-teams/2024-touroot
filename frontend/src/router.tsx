import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@components/layout/AppLayout/AppLayout";
import KakaoCallbackPage from "@components/pages/login/KakaoCallbackPage";
import LoginPage from "@components/pages/login/LoginPage";
import MainPage from "@components/pages/main/MainPage";
import TravelPlanRegisterPage from "@components/pages/travelPlanRegister/TravelPlanRegisterPage";
import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";
import TravelogueRegisterPage from "@components/pages/travelogueRegister/TravelogueRegisterPage";

import { ROUTE_PATHS } from "./constants/route";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.root,
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATHS.root,
        element: <MainPage />,
      },
      {
        path: ROUTE_PATHS.login,
        element: <LoginPage />,
      },

      {
        path: ROUTE_PATHS.loginCallback,
        element: <KakaoCallbackPage />,
      },
      {
        path: ROUTE_PATHS.travelogue,
        element: <TravelogueDetailPage />,
      },
      {
        path: ROUTE_PATHS.travelogueRegister,
        element: <TravelogueRegisterPage />,
      },
      {
        path: ROUTE_PATHS.travelPlanRegister,
        element: <TravelPlanRegisterPage />,
      },
    ],
  },
]);
