import { useContext } from "react";

import { SaveUserContext, UserContext } from "@contexts/UserProvider";

const useUser = () => {
  const user = useContext(UserContext);
  const saveUser = useContext(SaveUserContext);

  if (!user || !saveUser) throw new Error("Provider 바깥에 존재합니다!");

  return {
    ...user,
    ...saveUser,
  };
};
export default useUser;
