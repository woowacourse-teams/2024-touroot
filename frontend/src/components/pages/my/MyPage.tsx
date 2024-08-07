import { css } from "@emotion/react";

import { useUserProfile } from "@queries/useUserProfile";

import { AvatarCircle, Tab, Text } from "@components/common";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const { data } = useUserProfile();

  if (!data) return null;

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
