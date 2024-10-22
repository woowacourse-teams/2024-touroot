import { useState } from "react";

import usePutProfile from "@queries/usePutProfile";

interface UseProfileEdit {
  userNickname: string | undefined;
  nickname: string;
  updateNickname: (newNickname: string) => void;
  userProfileImageUrl: string | undefined;
  profileImageUrl: string;
  updateProfileImageUrl: (newProfileImageUrl: string) => void;
}

const useProfileEdit = ({
  userNickname,
  nickname,
  updateNickname,
  userProfileImageUrl,
  profileImageUrl,
  updateProfileImageUrl,
}: UseProfileEdit) => {
  const onError = (error: Error) => {
    alert(error.message);
    updateNickname(userNickname ?? "");
    updateProfileImageUrl(userProfileImageUrl ?? "");
  };

  const { mutate: mutateModifyProfile } = usePutProfile(onError);

  const [isModifying, setIsModifying] = useState(false);

  const handleClickProfileEditButton = () => setIsModifying(true);

  const handleClickProfileEditConfirmButton = () => {
    const trimmedNickname = nickname.trim();
    const newNickname = trimmedNickname || userNickname || "";

    updateNickname(newNickname);
    mutateModifyProfile({ nickname: newNickname, profileImageUrl });

    setIsModifying(false);
  };

  const handleClickProfileEditCancelButton = () => {
    updateNickname(userNickname ?? "");
    updateProfileImageUrl(userProfileImageUrl ?? "");

    setIsModifying(false);
  };
  return {
    isModifying,
    handleClickProfileEditButton,
    handleClickProfileEditConfirmButton,
    handleClickProfileEditCancelButton,
  };
};

export default useProfileEdit;
