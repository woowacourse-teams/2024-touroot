import { RouterProvider } from "react-router-dom";

import { TravelTransformDetailProvider } from "@contexts/TravelTransformDetailProvider";
import UserProvider from "@contexts/UserProvider";

import { router } from "./router";

const App = () => {
  return (
    <UserProvider>
      <TravelTransformDetailProvider>
        <RouterProvider router={router} />
      </TravelTransformDetailProvider>
    </UserProvider>
  );
};

export default App;
