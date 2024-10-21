import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import type { UserResponse } from "@type/domain/user";

import useInfiniteMyLikes from "@queries/useInfiniteMyLikes";

import { AvatarCircle, Text } from "@components/common";
import MyPageTabContentSkeleton from "@components/pages/my/MyPageTabContentSkeleton/MyPageTabContentSkeleton";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import theme from "@styles/theme";

import * as S from "./MyLikes.styled";

interface MyLikesProps {
  userData: UserResponse;
}

const MyLikes = ({ userData }: MyLikesProps) => {
  const { myLikes, fetchNextPage, status, isPaused, error } = useInfiniteMyLikes(userData);
  const { lastElementRef } = useIntersectionObserver(fetchNextPage);

  const navigate = useNavigate();

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
      <S.List>
        {myLikes.map(({ id, title, createdAt, thumbnailUrl, authorName }) => (
          <S.BoxButton key={id}>
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
                <S.DetailContainer>
                  <Text
                    textType="detail"
                    css={css`
                      color: ${theme.colors.text.secondary};
                    `}
                  >
                    {authorName}
                  </Text>
                  <Text
                    textType="detail"
                    css={css`
                      color: ${theme.colors.text.secondary};
                    `}
                  >
                    {createdAt}
                  </Text>
                </S.DetailContainer>
              </S.Container>
            </S.Layout>
          </S.BoxButton>
        ))}
      </S.List>

      <div
        ref={lastElementRef}
        css={css`
          height: 1px;
        `}
      />
    </>
  );
};

export default MyLikes;
