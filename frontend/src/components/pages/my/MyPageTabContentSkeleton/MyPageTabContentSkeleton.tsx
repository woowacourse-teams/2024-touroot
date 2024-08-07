import Skeleton from "@components/common/Skeleton/Skeleton";

import * as S from "../MyPageTabContent/MyPageTabContent.styled";

interface MyPageTabContentSkeletonProps {
  itemCount?: number;
}

const MyPageTabContentSkeleton: React.FC<MyPageTabContentSkeletonProps> = ({ itemCount = 3 }) => {
  return (
    <S.List>
      <Skeleton width="100%" height="6.8rem" />
      {Array.from({ length: itemCount }).map(() => (
        <Skeleton width="100%" height="9.36rem" />
      ))}
    </S.List>
  );
};

export default MyPageTabContentSkeleton;
