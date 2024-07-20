// import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import TravelogueDetailPage from "@components/pages/travelogueDetail/TravelogueDetailPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: (
      //   <Suspense fallback={<Loading />}>
      //     <MainPage />
      //   </Suspense>
      // ),
      // errorElement: <ErrorPage/>,
      children: [
        {
          path: "travelogueDetailPage",
          element: <TravelogueDetailPage />,
          // errorElement: <ErrorPage/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
