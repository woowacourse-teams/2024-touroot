import { useState } from "react";

import { User } from "@type/domain/user";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (userInfo: User) => {
    setUser(userInfo);
  };

  return {
    user,
    saveUser,
  };
};
export default useUser;
