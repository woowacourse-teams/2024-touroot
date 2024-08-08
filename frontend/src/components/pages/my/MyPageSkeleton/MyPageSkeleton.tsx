import Skeleton from "@components/common/Skeleton/Skeleton";

import * as S from "../MyPage.styled";

const MyPageSkeleton = () => {
  return (
    <S.Layout>
      <Skeleton width="8rem" height="8rem" borderRadius="50%" />
      <Skeleton width="12rem" height="2.4rem" />
      <Skeleton width="12rem" height="4rem" />
      <S.TabContentContainer>
        <Skeleton width="100%" height="40rem" />
      </S.TabContentContainer>
    </S.Layout>
  );
};

export default MyPageSkeleton;
