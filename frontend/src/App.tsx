import { RouterProvider } from "react-router-dom";

import { TravelogueProvider } from "@contexts/TravelogueProvider";
import UserProvider from "@contexts/UserProvider";

import { router } from "./router";

const App = () => {
  return (
    <UserProvider>
      <TravelogueProvider>
        <RouterProvider router={router} />
      </TravelogueProvider>
    </UserProvider>
  );
};

export default App;
