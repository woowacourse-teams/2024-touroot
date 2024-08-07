import { createContext, useState } from "react";

import type { AuthTokenResponse } from "@type/domain/user";

import { STORAGE_KEYS_MAP } from "@constants/storage";

export interface UserContextProps {
  user: AuthTokenResponse | null;
}

export interface SaveUserContextProps {
  saveUser: (userInfo: AuthTokenResponse) => void;
}

export const UserContext = createContext({} as UserContextProps);
export const SaveUserContext = createContext({} as SaveUserContextProps);

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<AuthTokenResponse | null>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEYS_MAP.user) ?? "{}") ?? null,
  );

  const saveUser = (user: AuthTokenResponse) => {
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
