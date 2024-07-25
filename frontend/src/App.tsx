import { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

export interface User {
  accessToken: string;
  nickname: string;
  profileImageUrl: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (userInfo: User) => {
    setUser(userInfo);
  };

  return {
    user,
    saveUser,
  };
};

interface UseUserContextProps {
  user: User | null;
}

interface UseSetUserContextProps {
  saveUser: (userInfo: User) => void;
}

export const UseUserContext = createContext({} as UseUserContextProps);
export const UseSetUserContext = createContext({} as UseSetUserContextProps);

const App = () => {
  const { user, saveUser } = useUser();

  return (
    <UseUserContext.Provider value={{ user }}>
      <UseSetUserContext.Provider value={{ saveUser }}>
        <RouterProvider router={router} />
      </UseSetUserContext.Provider>
    </UseUserContext.Provider>
  );
};

export default App;
