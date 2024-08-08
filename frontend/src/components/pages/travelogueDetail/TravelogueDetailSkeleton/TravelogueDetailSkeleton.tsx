import { css } from "@emotion/react";

import Skeleton from "@components/common/Skeleton/Skeleton";

import * as S from "./TravelogueDetailSkeleton.styled";

const TravelogueDetailSkeleton = () => {
  return (
    <>
      <S.TitleLayout>
        <Skeleton width="100%" height="20rem" />
        <S.TitleContainer
          css={css`
            margin-bottom: 1.6rem;
          `}
        >
          <Skeleton width="80%" height="2.4rem" />
          <S.AuthorDateContainer>
            <Skeleton width="100px" height="1.6rem" />
            <Skeleton width="100px" height="1.6rem" />
          </S.AuthorDateContainer>
          <S.IconButtonContainer>
            <S.LikesContainer>
              <Skeleton width="2.4rem" height="2.4rem" borderRadius="50%" />
              <Skeleton width="2.0rem" height="1.6rem" />
            </S.LikesContainer>
            <S.MoreContainer>
              <Skeleton width="1.6rem" height="1.6rem" borderRadius="50%" />
            </S.MoreContainer>
          </S.IconButtonContainer>
          <Skeleton width="60%" height="2.4rem" />
        </S.TitleContainer>
      </S.TitleLayout>
      <Skeleton width="100%" height="4.8rem" />
      <S.ContentContainer>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <Skeleton width="100%" height="12rem" />
            <div style={{ marginTop: "1rem" }}>
              <Skeleton width="60%" height="2rem" />
              <Skeleton
                width="100%"
                height="4rem"
                css={css`
                  margin-top: 1rem;
                `}
              />
            </div>
          </div>
        ))}
      </S.ContentContainer>
    </>
  );
};

export default TravelogueDetailSkeleton;
