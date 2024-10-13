import { FormEvent, MouseEvent, useEffect, useState } from "react";

import usePatchNickname from "@queries/usePatchNickname";
import { useUserProfile } from "@queries/useUserProfile";

import { AvatarCircle, CharacterCount, Input, Tab, Text } from "@components/common";
import MyPageSkeleton from "@components/pages/my/MyPageSkeleton/MyPageSkeleton";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const TAB_CONTENT = [
  { label: "✈️ 내 여행 계획", component: MyTravelPlans },
  { label: "📝 내 여행기", component: MyTravelogues },
  { label: "❤️ 좋아요", component: MyTravelogues }, // 추후 컴포넌트 바꿀 예정
] as const;

const MyPage = () => {
  const { data, status, error } = useUserProfile();

  const [isModifying, setIsModifying] = useState(false);
  const [nickname, setNickname] = useState(data?.nickname ?? "");

  const onError = (error: Error) => {
    alert(error.message);
    setNickname(data?.nickname ?? "");
  };

  const { mutate: mutateModifyNickname } = usePatchNickname(onError);

  useEffect(() => {
    if (data?.nickname) {
      setNickname(data.nickname);
    }
  }, [data?.nickname]);

  const handleStartNicknameEdit = () => {
    setIsModifying(true);
  };

  const handleSubmitNicknameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedNickname = nickname.trim();
    const newNickname = trimmedNickname || data?.nickname || "";

    setNickname(newNickname);
    mutateModifyNickname(newNickname);

    setIsModifying(false);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isModifying) {
      e.preventDefault();
      handleStartNicknameEdit();
    }
  };

  if (status === "pending" || status === "error") {
    if (
      status === "error" &&
      error.message !== ERROR_MESSAGE_MAP.api.login &&
      error.message !== "Network Error"
    ) {
      alert(error.message);
    }

    return <MyPageSkeleton />;
  }

  return (
    <S.Layout>
      <S.FormWrapper onSubmit={handleSubmitNicknameChange}>
        <S.ButtonWrapper>
          <S.Button type={isModifying ? "submit" : "button"} onClick={handleButtonClick}>
            {isModifying ? "확인" : "프로필 수정"}
          </S.Button>
        </S.ButtonWrapper>

        <AvatarCircle $size="large" profileImageUrl={data?.profileImageUrl} />

        <S.NicknameWrapper>
          {!isModifying ? (
            <Text textType="body" css={S.NicknameStyle}>
              {nickname}
            </Text>
          ) : (
            <S.InputContainer>
              <Input
                placeholder={data?.nickname}
                value={nickname}
                autoFocus
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                spellCheck={false}
                css={S.inputStyle}
                onChange={(e) =>
                  setNickname(
                    e.target.value.slice(
                      FORM_VALIDATIONS_MAP.title.minLength,
                      FORM_VALIDATIONS_MAP.title.maxLength,
                    ),
                  )
                }
              />
              <CharacterCount
                count={nickname?.length}
                maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              />
            </S.InputContainer>
          )}
        </S.NicknameWrapper>
      </S.FormWrapper>

      <Tab
        storageKey={STORAGE_KEYS_MAP.myPageSelectedTabIndex}
        labels={TAB_CONTENT.map((tab) => tab.label)}
        tabContent={(selectedIndex) => {
          const SelectedComponent = TAB_CONTENT[selectedIndex].component;

          return data ? <SelectedComponent userData={data} /> : <></>;
        }}
        css={S.ListStyle}
      />
    </S.Layout>
  );
};

export default MyPage;
