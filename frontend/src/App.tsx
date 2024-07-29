import { RouterProvider } from "react-router-dom";

import UserProvider from "@contexts/UserProvider";

import { router } from "./router";

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
