import { css } from "@emotion/react";

import { AvatarCircle, Tab, Text } from "@components/common";

import useUser from "@hooks/useUser";

import theme from "@styles/theme";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const { user } = useUser();

  return (
    <S.Layout>
      <AvatarCircle $size="large" profileImageUrl={user?.profileImageUrl} />
      <Text
        textType="body"
        css={css`
          font-weight: 700;
        `}
      >
        {user?.nickname}
      </Text>

      <Tab
        labels={["내 여행 계획", "내 여행기"]}
        tabContent={(selectedIndex) => (
          <>{selectedIndex === 0 ? <MyTravelPlans /> : <MyTravelogues />}</>
        )}
        css={css`
          li {
            ${theme.typography.mobile.body};
            font-weight: 700;
          }
        `}
      />
    </S.Layout>
  );
};

export default MyPage;
