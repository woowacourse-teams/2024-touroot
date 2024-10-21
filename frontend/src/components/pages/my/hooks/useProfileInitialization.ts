import { useEffect } from "react";

interface UseProfileInitialization {
  userNickname: string | undefined;
  updateNickname: (newNickname: string) => void;
  userProfileImageUrl: string | undefined;
  updateProfileImageUrl: (newProfileImageUrl: string) => void;
}

const useProfileInitialization = ({
  userNickname,
  updateNickname,
  userProfileImageUrl,
  updateProfileImageUrl,
}: UseProfileInitialization) => {
  useEffect(() => {
    if (userNickname) updateNickname(userNickname);
    if (userProfileImageUrl) updateProfileImageUrl(userProfileImageUrl);
  }, [userNickname, userProfileImageUrl, updateNickname, updateProfileImageUrl]);
};

export default useProfileInitialization;
