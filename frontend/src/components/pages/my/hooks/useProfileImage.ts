import { useCallback, useRef, useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";

interface UseProfileImage {
  userProfileImageUrl: string | undefined;
  handleCloseEditModal: () => void;
}

const useProfileImage = ({ userProfileImageUrl, handleCloseEditModal }: UseProfileImage) => {
  const profileImageFileInputRef = useRef<HTMLInputElement>(null);

  const [profileImageUrl, setProfileImageUrl] = useState(userProfileImageUrl ?? "");
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);

  const updateProfileImageUrl = useCallback(
    (newProfileImageUrl: string) => {
      setProfileImageUrl(newProfileImageUrl);
    },
    [setProfileImageUrl],
  );

  const handleClickProfileImageEditButton = () => profileImageFileInputRef.current?.click();

  const { mutateAsync: mutateAddImage } = usePostUploadImages();

  const handleChangeProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProfileImageLoading(true);
    handleCloseEditModal();

    const files = Array.from(e.target.files as FileList);
    const profileImage = await mutateAddImage({ files });

    setProfileImageUrl(profileImage[0]);
  };

  const handleLoadProfileImage = () => setIsProfileImageLoading(false);

  const handleClickProfileImageDeleteButton = () => {
    setProfileImageUrl("");
    handleCloseEditModal();
  };

  return {
    profileImageFileInputRef,
    profileImageUrl,
    isProfileImageLoading,
    handleClickProfileImageEditButton,
    handleChangeProfileImage,
    handleLoadProfileImage,
    handleClickProfileImageDeleteButton,
    updateProfileImageUrl,
  };
};

export default useProfileImage;
