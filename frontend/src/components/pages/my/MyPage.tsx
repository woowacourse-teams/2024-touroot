import { FormEvent, MouseEvent, useEffect, useState } from "react";

import usePatchNickname from "@queries/usePatchNickname";
import { useUserProfile } from "@queries/useUserProfile";

import { AvatarCircle, Input, Tab, Text } from "@components/common";
import MyPageSkeleton from "@components/pages/my/MyPageSkeleton/MyPageSkeleton";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const { data, isLoading } = useUserProfile();
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

    if (data?.nickname && !trimmedNickname) {
      setNickname(data?.nickname);
      mutateModifyNickname(data?.nickname);
    } else if (trimmedNickname) {
      mutateModifyNickname(trimmedNickname);
      setNickname(trimmedNickname);
    }

    setIsModifying(false);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isModifying) {
      e.preventDefault();
      handleStartNicknameEdit();
    }
  };

  if (isLoading) return <MyPageSkeleton />;

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
            <Input
              placeholder={data?.nickname}
              value={nickname}
              autoFocus
              maxCount={20}
              maxLength={20}
              count={nickname?.length}
              spellCheck={false}
              css={S.inputStyle}
              onChange={(e) => setNickname(e.target.value)}
            />
          )}
        </S.NicknameWrapper>
      </S.FormWrapper>

      <Tab
        storageKey={STORAGE_KEYS_MAP.myPageSelectedTabIndex}
        labels={["내 여행 계획", "내 여행기"]}
        tabContent={(selectedIndex) => (
          <>{selectedIndex === 0 ? <MyTravelPlans /> : <MyTravelogues />}</>
            ) : data ? (
              <MyTravelogues userData={data} />
            ) : null}
        )}
        css={S.ListStyle}
      />
    </S.Layout>
  );
};

export default MyPage;
