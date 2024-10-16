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

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";
import ProfileImageEditModalBottomSheet from "./ProfileImageEditModalBottomSheet/ProfileImageEditModalBottomSheet";
import useMyPage from "./hooks/useMyPage";

const TAB_CONTENT = [
  { label: "✈️ 내 여행 계획", component: MyTravelPlans },
  { label: "📝 내 여행기", component: MyTravelogues },
] as const;

const IGNORED_ERROR_MESSAGES = [ERROR_MESSAGE_MAP.api.login, "Network Error"];

const MyPage = () => {
  const { states, handlers, userProfile, profileImageFileInputRef } = useMyPage();

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
      {states.isModifying ? (
        <S.ProfileContainer>
          <S.EditButtonContainer>
            <S.ProfileEditButtonContainer>
              <S.EditButton type="button" onClick={handlers.handleClickProfileEditCancelButton}>
                취소
              </S.EditButton>
              <S.EditButton type="button" onClick={handlers.handleClickProfileEditConfirmButton}>
                확인
              </S.EditButton>
            </S.ProfileEditButtonContainer>
          </S.EditButtonContainer>

          <S.ProfileImageContainer>
            <S.ProfileImageWrapper $isProfileImageLoading={states.isProfileImageLoading}>
              <AvatarCircle
                size="large"
                profileImageUrl={states.profileImageUrl}
                onLoad={handlers.handleLoadProfileImage}
              />
            </S.ProfileImageWrapper>

            {states.isProfileImageLoading ? (
              <S.ProfileImageLoadingWrapper>
                <Spinner variants="circle" size={40} />
              </S.ProfileImageLoadingWrapper>
            ) : (
              <>
                <S.ProfileImageHiddenInput
                  ref={profileImageFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlers.handleChangeProfileImage}
                  aria-label="썸네일 이미지 선택"
                  title="이미지 파일을 선택하세요"
                />
                <IconButton
                  iconType="camera-icon"
                  onClick={handlers.handleClickEditModalOpenButton}
                  css={S.profileImageEditButtonStyle}
                />
              </>
            )}
          </S.ProfileImageContainer>

          <S.NickNameEditContainer>
            <Input
              placeholder={userProfile.data?.nickname}
              value={states.nickname}
              autoFocus
              maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
              spellCheck={false}
              css={S.inputStyle}
              onChange={handlers.handleChangeNickname}
            />
            <CharacterCount
              count={states.nickname?.length}
              maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
            />
          </S.NickNameEditContainer>
        </S.ProfileContainer>
      ) : (
        <S.ProfileContainer>
          <S.EditButtonContainer>
            <S.EditButton type="button" onClick={handlers.handleClickProfileEditButton}>
              프로필 수정
            </S.EditButton>
          </S.EditButtonContainer>

          <S.ProfileImageContainer>
            <AvatarCircle size="large" profileImageUrl={states.profileImageUrl} />
          </S.ProfileImageContainer>

          <S.NicknameWrapper>
            <Text textType="bodyBold" css={S.nicknameStyle}>
              {states.nickname}
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

      <ProfileImageEditModalBottomSheet
        isOpen={states.isModalOpen}
        onClose={handlers.handleClickEditModalCloseButton}
      >
        <S.Button onClick={handlers.handleClickProfileImageEditButton}>
          <Text textType="detail">앨범에서 선택</Text>
        </S.Button>
        {states.profileImageUrl && (
          <S.Button onClick={handlers.handleClickProfileImageDeleteButton}>
            <Text textType="detailBold" css={S.deleteTextColor}>
              프로필 사진 삭제
            </Text>
          </S.Button>
        )}
      </ProfileImageEditModalBottomSheet>
    </S.Layout>
  );
};

export default MyPage;
