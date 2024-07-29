import { createContext } from "react";

import { User } from "@type/domain/user";

export interface UserContextProps {
  user: User | null;
}

export interface SaveUserContextProps {
  saveUser: (userInfo: User) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const SaveUserContext = createContext({} as SaveUserContextProps);

const UserProvider = ({
  children,
  user,
  saveUser,
}: React.PropsWithChildren<UserContextProps & SaveUserContextProps>) => {
  return (
    <UserContext.Provider value={{ user }}>
      <SaveUserContext.Provider value={{ saveUser }}>{children}</SaveUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
