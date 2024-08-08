import Skeleton from "@components/common/Skeleton/Skeleton";

import * as S from "./TravelPlanDetailSkeleton.styled";

const TravelPlanDetailSkeleton = () => {
  return (
    <>
      <S.TitleContainer>
        <Skeleton width="80%" height="3.2rem" />
        <S.IconButtonContainer>
          <Skeleton width="1.6rem" height="1.6rem" borderRadius="50%" />
          <Skeleton width="1.6rem" height="1.6rem" borderRadius="50%" />
        </S.IconButtonContainer>
      </S.TitleContainer>

      <S.SummaryTitleContainer>
        <Skeleton width="60%" height="2.4rem" />
      </S.SummaryTitleContainer>

      <S.TabContainer>
        <Skeleton width="100%" height="4rem" />
      </S.TabContainer>

      <S.ContentContainer>
        {Array.from({ length: 3 }, (_, index) => (
          <S.PlaceContainer key={index}>
            <Skeleton width="100%" height="12rem" />
            <S.PlaceInfoContainer>
              <Skeleton width="60%" height="2rem" />
              <Skeleton width="100%" height="4rem" />
            </S.PlaceInfoContainer>
          </S.PlaceContainer>
        ))}
      </S.ContentContainer>
    </>
  );
};

export default TravelPlanDetailSkeleton;
