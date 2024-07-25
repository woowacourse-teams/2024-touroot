import { RouterProvider } from "react-router-dom";

import UserProvider from "@contexts/UserProvider";

import useUser from "@hooks/useUser";

import { router } from "./router";

const App = () => {
  const { user, saveUser } = useUser();

  return (
    <UserProvider user={user} saveUser={saveUser}>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
