import { createContext, useState } from "react";

import type { UserResponse } from "@type/domain/user";

import { STORAGE_KEYS_MAP } from "@constants/storage";

export interface UserContextProps {
  user: UserResponse | null;
}

export interface SaveUserContextProps {
  saveUser: (userInfo: UserResponse) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const SaveUserContext = createContext({} as SaveUserContextProps);

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEYS_MAP.user) ?? "{}") ?? null,
  );

  const saveUser = (user: UserResponse) => {
    localStorage.setItem(STORAGE_KEYS_MAP.user, JSON.stringify(user ?? {}));
    setUser(user);
  };
  return (
    <UserContext.Provider value={{ user }}>
      <SaveUserContext.Provider value={{ saveUser }}>{children}</SaveUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
