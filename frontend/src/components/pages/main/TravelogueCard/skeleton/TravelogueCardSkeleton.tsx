import * as S from "./TravelogueCardSkeleton.styled";

const TravelogueCardSkeleton = () => {
  return (
    <S.Layout>
      <S.ThumbnailCard />

      <S.BottomBarContainer>
        <S.TitleContainer>
          <S.ProfileSkeleton />
          <S.TitleSkeleton />
        </S.TitleContainer>

        <S.LikesSkeleton />
      </S.BottomBarContainer>
    </S.Layout>
  );
};

export default TravelogueCardSkeleton;
