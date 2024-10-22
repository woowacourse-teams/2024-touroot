import { useUserProfile } from "@queries/useUserProfile";

import useToggle from "@hooks/useToggle";

import useProfileEdit from "./useProfileEdit";
import useProfileImage from "./useProfileImage";
import useProfileInitialization from "./useProfileInitialization";
import useProfileNickname from "./useProfileNickname";

const useMyPage = () => {
  const [isEditModalOpen, handleOpenEditModal, handleCloseEditModal] = useToggle();

  const { data, status, error } = useUserProfile();
  const { nickname: userNickname, profileImageUrl: userProfileImageUrl } = data ?? {};

  const {
    profileImageFileInputRef,
    profileImageUrl,
    isProfileImageLoading,
    handleClickProfileImageEditButton,
    handleChangeProfileImage,
    handleLoadProfileImage,
    handleClickProfileImageDeleteButton,
    updateProfileImageUrl,
  } = useProfileImage({ userProfileImageUrl, handleCloseEditModal });

  const { nickname, handleChangeNickname, updateNickname } = useProfileNickname(userNickname);

  const {
    isModifying,
    handleClickProfileEditButton,
    handleClickProfileEditConfirmButton,
    handleClickProfileEditCancelButton,
  } = useProfileEdit({
    userNickname,
    nickname,
    updateNickname,
    userProfileImageUrl,
    profileImageUrl,
    updateProfileImageUrl,
  });

  useProfileInitialization({
    userNickname,
    updateNickname,
    userProfileImageUrl,
    updateProfileImageUrl,
  });

  return {
    editModal: {
      isEditModalOpen,
      handleOpenEditModal,
      handleCloseEditModal,
    },
    profileImage: {
      profileImageFileInputRef,
      profileImageUrl,
      isProfileImageLoading,
      handleClickProfileImageEditButton,
      handleChangeProfileImage,
      handleLoadProfileImage,
      handleClickProfileImageDeleteButton,
    },
    profileNickname: {
      nickname,
      handleChangeNickname,
    },
    profileEdit: {
      isModifying,
      handleClickProfileEditButton,
      handleClickProfileEditConfirmButton,
      handleClickProfileEditCancelButton,
    },
    userProfile: { data, status, error },
  };
};

export default useMyPage;
