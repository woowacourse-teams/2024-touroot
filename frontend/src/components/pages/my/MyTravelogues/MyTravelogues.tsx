import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import useInfiniteMyTravelogues from "@queries/useInfiniteMyTravelogues";

import { AvatarCircle, Text } from "@components/common";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import TabContent from "../MyPageTabContent/MyPageTabContent";
import * as S from "./MyTravelogues.styled";

const MyTravelogues = () => {
  const { myTravelogues, fetchNextPage, status } = useInfiniteMyTravelogues();
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const navigate = useNavigate();

  const handleClickAddButton = () => {
    navigate(ROUTE_PATHS_MAP.travelogueRegister);
  };

  const handleClickTravelogue = (id: string) => {
    navigate(ROUTE_PATHS_MAP.travelogue(Number(id)));
  };

  if (status === "pending") return <div>로딩 중...</div>;

  return (
    <>
      <TabContent
        iconButtonLabel="새 여행기 추가하기"
        onClickIconButton={handleClickAddButton}
        contentDetail={myTravelogues}
        renderItem={({ id, thumbnailUrl, title, createdAt }) => (
          <S.Layout onClick={() => handleClickTravelogue(id)}>
            <AvatarCircle $size="medium" profileImageUrl={thumbnailUrl} />
            <S.Container>
              <Text
                textType="body"
                css={css`
                  font-weight: 500;
                `}
              >
                {title}
              </Text>
              <Text
                textType="detail"
                css={css`
                  color: ${theme.colors.text.secondary};
                `}
              >
                게시일 {createdAt}
              </Text>
            </S.Container>
          </S.Layout>
        )}
      />
      <div
        ref={lastElementRef}
        css={css`
          height: 1px;
        `}
      />
    </>
  );
};

export default MyTravelogues;

export interface MyTravelogue {
  id: string;
  thumbnailUrl: string;
  title: string;
  createdAt: string;
}
