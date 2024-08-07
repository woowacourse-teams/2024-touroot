import * as S from "./Skeleton.styled";

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton = ({
  width,
  height,
  borderRadius,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & SkeletonProps) => {
  return <S.Layout width={width} height={height} borderRadius={borderRadius} {...props} />;
};

export default Skeleton;
