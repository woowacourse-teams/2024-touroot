import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div<SkeletonProps>`
  display: inline-block;
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "16px"};
  border-radius: ${({ borderRadius }) => borderRadius ?? "4px"};

  background-color: #eee;

  line-height: 1;

  animation: ${shimmer} 1.2s ease-in-out infinite;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;
`;

const Skeleton: React.FC<React.ComponentPropsWithoutRef<"div"> & SkeletonProps> = ({
  width,
  height,
  borderRadius,
  ...props
}) => {
  return <SkeletonBase width={width} height={height} borderRadius={borderRadius} {...props} />;
};

export default Skeleton;
