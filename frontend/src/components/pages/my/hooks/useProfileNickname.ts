import { useCallback, useState } from "react";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

const useProfileNickname = (userProfileNickname: string | undefined) => {
  const [nickname, setNickname] = useState(userProfileNickname ?? "");

  const updateNickname = useCallback(
    (newNickname: string) => {
      setNickname(newNickname);
    },
    [setNickname],
  );

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNickname(
      e.target.value.slice(
        FORM_VALIDATIONS_MAP.title.minLength,
        FORM_VALIDATIONS_MAP.title.maxLength,
      ),
    );
  };

  return {
    nickname,
    updateNickname,
    handleChangeNickname,
  };
};

export default useProfileNickname;
