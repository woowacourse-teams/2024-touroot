import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { AvatarCircle, Tab, Text } from "@components/common";

import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import * as S from "./MyPage.styled";
import MyTravelPlans from "./MyTravelPlans/MyTravelPlans";
import MyTravelogues from "./MyTravelogues/MyTravelogues";

const MyPage = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (!user?.accessToken) {
      alert(ERROR_MESSAGE_MAP.api.login);
      navigate(ROUTE_PATHS_MAP.login);
    }
  }, [user?.accessToken, navigate]);

  return (
    <S.Layout>
      <AvatarCircle $size="large" profileImageUrl={user?.profileImageUrl} />
      <Text
        textType="body"
        css={css`
          font-weight: 600;
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
            font-weight: 600;
          }
        `}
      />
    </S.Layout>
  );
};

export default MyPage;
