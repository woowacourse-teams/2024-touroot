import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { SkeletonProps } from "@components/common/Skeleton/Skeleton";

const shimmer = keyframes`
  0% {
    background-position: -20rem 0;
  }
  100% {
    background-position: calc(20rem + 100%) 0;
  }
`;

export const Layout = styled.div<SkeletonProps>`
  display: inline-block;
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "1.6rem"};
  border-radius: ${({ borderRadius }) => borderRadius ?? "0.4rem"};

  background-color: ${({ theme }) => theme.colors.skeleton.base};

  line-height: 1;

  animation: ${shimmer} 1.2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton.base},
    ${({ theme }) => theme.colors.skeleton.highlight},
    ${({ theme }) => theme.colors.skeleton.base}
  );
  background-size: 20rem 100%;
  background-repeat: no-repeat;
`;
