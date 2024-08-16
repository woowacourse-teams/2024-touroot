import { FormEvent, MouseEvent, useRef, useState } from "react";

import usePatchNickname from "@queries/usePatchNickname";
import { useUserProfile } from "@queries/useUserProfile";

import { AvatarCircle, Input, Tab, Text } from "@components/common";
import MyPageSkeleton from "@components/pages/my/MyPageSkeleton/MyPageSkeleton";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const { data, isLoading } = useUserProfile();
  const [isModifying, setIsModifying] = useState(false);
  const { mutate: modifyNickname } = usePatchNickname();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartNicknameEdit = () => {
    setIsModifying(true);
  };

  const handleSubmitNicknameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedNickname = inputRef.current?.value?.trim();

    if (data?.nickname && !trimmedNickname) {
      modifyNickname(data?.nickname);
    } else if (trimmedNickname) {
      modifyNickname(trimmedNickname);
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
              {data?.nickname}
            </Text>
          ) : (
            <Input
              ref={inputRef}
              placeholder={data?.nickname}
              defaultValue={data?.nickname}
              autoFocus
              spellCheck={false}
              css={S.inputStyle}
            />
          )}
        </S.NicknameWrapper>
      </S.FormWrapper>

      <Tab
        labels={["내 여행 계획", "내 여행기"]}
        tabContent={(selectedIndex) => (
          <>{selectedIndex === 0 ? <MyTravelPlans /> : <MyTravelogues />}</>
        )}
        css={S.ListStyle}
      />
    </S.Layout>
  );
};

export default MyPage;
