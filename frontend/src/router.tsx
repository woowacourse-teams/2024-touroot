import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@components/layout/AppLayout/AppLayout";
import KakaoCallbackPage from "@components/pages/login/KakaoCallbackPage";
import LoginPage from "@components/pages/login/LoginPage";
import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";

import { ROUTE_PATHS } from "./constants/route";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.root,
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATHS.root,
        //TODO: 별도의 main page 컴포넌트 추가 해야함
        element: <div>메인 페이지</div>,
      },
      {
        path: ROUTE_PATHS.travelogue,
        element: <TravelogueDetailPage />,
      },
      {
        path: ROUTE_PATHS.login,
        element: <LoginPage />,
      },

      {
        path: ROUTE_PATHS.loginCallback,
        element: <KakaoCallbackPage />,
      },
    ],
  },
]);
