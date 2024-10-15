import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import type { UserResponse } from "@type/domain/user";

import useInfiniteMyTravelogues from "@queries/useInfiniteMyTravelogues";

import { AvatarCircle, Text } from "@components/common";
import MyPageTabContentSkeleton from "@components/pages/my/MyPageTabContentSkeleton/MyPageTabContentSkeleton";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import TabContent from "../MyPageTabContent/MyPageTabContent";
import * as S from "./MyTravelogues.styled";

interface MyTraveloguesProps {
  userData: UserResponse;
}

const MyTravelogues = ({ userData }: MyTraveloguesProps) => {
  const { myTravelogues, fetchNextPage, status, isPaused, error } =
    useInfiniteMyTravelogues(userData);
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const navigate = useNavigate();

  const handleClickAddButton = () => {
    navigate(ROUTE_PATHS_MAP.travelogueRegister);
  };

  const handleClickTravelogue = (id: string) => {
    navigate(ROUTE_PATHS_MAP.travelogue(Number(id)));
  };

  useEffect(() => {
    if (isPaused) alert(ERROR_MESSAGE_MAP.network);
  }, [isPaused]);

  if (status === "pending") return <MyPageTabContentSkeleton />;

  if (error) alert(error.message);

  return (
    <>
      <TabContent
        iconButtonLabel="새 여행기 추가하기"
        onClickIconButton={handleClickAddButton}
        contentDetail={myTravelogues}
        renderItem={({ id, thumbnailUrl, title, createdAt }) => (
          <S.Layout onClick={() => handleClickTravelogue(id)}>
            <AvatarCircle size="medium" profileImageUrl={thumbnailUrl} />
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
