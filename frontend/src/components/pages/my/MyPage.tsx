import {
  AvatarCircle,
  CharacterCount,
  IconButton,
  Input,
  Spinner,
  Tab,
  Text,
} from "@components/common";
import MyPageSkeleton from "@components/pages/my/MyPageSkeleton/MyPageSkeleton";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./MyPage.styled";
import ProfileImageEditModalBottomSheet from "./ProfileImageEditModalBottomSheet/ProfileImageEditModalBottomSheet";
import { IGNORED_ERROR_MESSAGES, TAB_CONTENT } from "./constants";
import useMyPage from "./hooks/useMyPage";

const MyPage = () => {
  const { editModal, profileImage, profileNickname, profileEdit, userProfile } = useMyPage();

  const showErrorAlert = (error: Error | null) => {
    if (error && !IGNORED_ERROR_MESSAGES.includes(error.message)) alert(error.message);
  };

  if (userProfile.status === "pending") return <MyPageSkeleton />;

  if (userProfile.status === "error") {
    showErrorAlert(userProfile.error);

    return <MyPageSkeleton />;
  }

  return (
    <S.Layout>
      {profileEdit.isModifying ? (
        <S.ProfileContainer>
          <S.EditButtonContainer>
            <S.ProfileEditButtonContainer>
              <S.EditButton type="button" onClick={profileEdit.handleClickProfileEditCancelButton}>
                취소
              </S.EditButton>
              <S.EditButton type="button" onClick={profileEdit.handleClickProfileEditConfirmButton}>
                확인
              </S.EditButton>
            </S.ProfileEditButtonContainer>
          </S.EditButtonContainer>

          <S.ProfileImageContainer>
            <S.ProfileImageWrapper $isProfileImageLoading={profileImage.isProfileImageLoading}>
              <AvatarCircle
                size="large"
                profileImageUrl={profileImage.profileImageUrl}
                onLoad={profileImage.handleLoadProfileImage}
              />
            </S.ProfileImageWrapper>

            {profileImage.isProfileImageLoading ? (
              <S.ProfileImageLoadingWrapper>
                <Spinner variants="circle" size={40} />
              </S.ProfileImageLoadingWrapper>
            ) : (
              <>
                <S.ProfileImageHiddenInput
                  ref={profileImage.profileImageFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={profileImage.handleChangeProfileImage}
                  aria-label="썸네일 이미지 선택"
                  title="이미지 파일을 선택하세요"
                />
                <IconButton
                  iconType="camera-icon"
                  onClick={editModal.handleOpenEditModal}
                  css={S.profileImageEditButtonStyle}
                />
              </>
            )}
          </S.ProfileImageContainer>

          <S.NickNameEditContainer>
            <Input
              placeholder={userProfile.data?.nickname}
              value={profileNickname.nickname}
              autoFocus
              maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
              spellCheck={false}
              css={S.inputStyle}
              onChange={profileNickname.handleChangeNickname}
            />
            <CharacterCount
              count={profileNickname.nickname?.length}
              maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
            />
          </S.NickNameEditContainer>
        </S.ProfileContainer>
      ) : (
        <S.ProfileContainer>
          <S.EditButtonContainer>
            <S.EditButton type="button" onClick={profileEdit.handleClickProfileEditButton}>
              프로필 수정
            </S.EditButton>
          </S.EditButtonContainer>

          <S.ProfileImageContainer>
            <AvatarCircle size="large" profileImageUrl={profileImage.profileImageUrl} />
          </S.ProfileImageContainer>

          <S.NicknameWrapper>
            <Text textType="bodyBold" css={S.nicknameStyle}>
              {profileNickname.nickname}
            </Text>
          </S.NicknameWrapper>
        </S.ProfileContainer>
      )}

      <Tab
        storageKey={STORAGE_KEYS_MAP.myPageSelectedTabIndex}
        labels={TAB_CONTENT.map((tab) => tab.label)}
        tabContent={(selectedIndex) => {
          const SelectedComponent = TAB_CONTENT[selectedIndex].component;

          return userProfile.data ? <SelectedComponent userData={userProfile.data} /> : <></>;
        }}
        css={S.listStyle}
      />

      {editModal.isEditModalOpen && (
        <ProfileImageEditModalBottomSheet
          isOpen={editModal.isEditModalOpen}
          onClose={editModal.handleCloseEditModal}
        >
          <S.Button onClick={profileImage.handleClickProfileImageEditButton}>
            <Text textType="detail">프로필 사진 올리기</Text>
          </S.Button>
          {profileImage.profileImageUrl && (
            <S.Button onClick={profileImage.handleClickProfileImageDeleteButton}>
              <Text textType="detailBold" css={S.deleteTextColor}>
                프로필 사진 삭제하기
              </Text>
            </S.Button>
          )}
        </ProfileImageEditModalBottomSheet>
      )}
    </S.Layout>
  );
};

export default MyPage;
