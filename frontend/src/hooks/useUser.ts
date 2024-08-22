import { useContext } from "react";

import { SaveUserContext, UserContext } from "@contexts/UserProvider";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

const useUser = () => {
  const user = useContext(UserContext);
  const saveUser = useContext(SaveUserContext);

  if (!user || !saveUser) throw new Error(ERROR_MESSAGE_MAP.provider);

  return {
    ...user,
    ...saveUser,
  };
};
export default useUser;
