import React, { useEffect, useRef, useState } from "react";

import { usePostUploadImages } from "@queries/usePostUploadImages";
import usePutProfile from "@queries/usePutProfile";
import { useUserProfile } from "@queries/useUserProfile";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

const useMyPage = () => {
  const { data, status, error } = useUserProfile();

  const onError = (error: Error) => {
    alert(error.message);
    setNickname(data?.nickname ?? "");
  };

  const { mutate: mutateModifyProfile } = usePutProfile(onError);

  const profileImageFileInputRef = useRef<HTMLInputElement>(null);

  const [profileImageUrl, setProfileImageUrl] = useState(data?.profileImageUrl ?? "");
  const [nickname, setNickname] = useState(data?.nickname ?? "");

  const [isModifying, setIsModifying] = useState(false);
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickEditModalOpenButton = () => setIsModalOpen(true);
  const handleClickEditModalCloseButton = () => setIsModalOpen(false);

  const handleClickProfileEditButton = () => setIsModifying(true);
  const handleClickProfileImageEditButton = () => profileImageFileInputRef.current?.click();

  const { mutateAsync: mutateAddImage } = usePostUploadImages();

  const handleChangeProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProfileImageLoading(true);
    setIsModalOpen(false);

    const files = Array.from(e.target.files as FileList);
    const profileImage = await mutateAddImage(files);

    setProfileImageUrl(profileImage[0]);
  };

  const handleLoadProfileImage = () => {
    setIsProfileImageLoading(false);
  };

  const handleClickProfileImageDeleteButton = () => {
    setProfileImageUrl("");

    setIsModalOpen(false);
  };

  const handleClickProfileEditConfirmButton = () => {
    const trimmedNickname = nickname.trim();
    const newNickname = trimmedNickname || data?.nickname || "";

    setNickname(newNickname);
    mutateModifyProfile({ nickname: newNickname, profileImageUrl: profileImageUrl });

    setIsModifying(false);
  };

  const handleClickProfileEditCancelButton = () => {
    setNickname(data?.nickname ?? "");
    setProfileImageUrl(data?.profileImageUrl ?? "");

    setIsModifying(false);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(
      e.target.value.slice(
        FORM_VALIDATIONS_MAP.title.minLength,
        FORM_VALIDATIONS_MAP.title.maxLength,
      ),
    );
  };

  useEffect(() => {
    if (data?.nickname) setNickname(data.nickname);
    if (data?.profileImageUrl) setProfileImageUrl(data.profileImageUrl);
  }, [data?.nickname, data?.profileImageUrl]);

  return {
    states: { profileImageUrl, nickname, isModifying, isProfileImageLoading, isModalOpen },
    handlers: {
      handleClickEditModalOpenButton,
      handleClickEditModalCloseButton,
      handleClickProfileEditButton,
      handleClickProfileImageEditButton,
      handleChangeProfileImage,
      handleLoadProfileImage,
      handleClickProfileImageDeleteButton,
      handleClickProfileEditConfirmButton,
      handleClickProfileEditCancelButton,
      handleChangeNickname,
    },
    userProfile: { data, status, error },
    profileImageFileInputRef,
  };
};

export default useMyPage;
