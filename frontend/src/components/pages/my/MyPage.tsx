import { css } from "@emotion/react";

import { useUserProfile } from "@queries/useUserProfile";

import { AvatarCircle, Tab, Text } from "@components/common";
import MyPageSkeleton from "@components/pages/my/MyPageSkeleton/MyPageSkeleton";

import { STORAGE_KEYS_MAP } from "@constants/storage";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const { data, isLoading } = useUserProfile();

  if (isLoading) return <MyPageSkeleton />;

  return (
    <S.Layout>
      <AvatarCircle $size="large" profileImageUrl={data?.profileImageUrl} />
      <Text
        textType="body"
        css={css`
          font-weight: 700;
        `}
      >
        {data?.nickname}
      </Text>

      <Tab
        storageKey={STORAGE_KEYS_MAP.myPageSelectedTabIndex}
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
