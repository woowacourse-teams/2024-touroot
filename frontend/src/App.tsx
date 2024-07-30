import { RouterProvider } from "react-router-dom";

import { TransformDetailProvider } from "@contexts/TravelogueProvider";
import UserProvider from "@contexts/UserProvider";

import { router } from "./router";

const App = () => {
  return (
    <UserProvider>
      <TransformDetailProvider>
        <RouterProvider router={router} />
      </TransformDetailProvider>
    </UserProvider>
  );
};

export default App;
