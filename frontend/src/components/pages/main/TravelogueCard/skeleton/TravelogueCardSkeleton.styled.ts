import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const skeletonAnimation = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const SkeletonBase = styled.div`
  background-color: ${(props) => props.theme.colors.skeleton.base};
  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.skeleton.base} 6rem,
    ${(props) => props.theme.colors.skeleton.highlight} 12rem,
    ${(props) => props.theme.colors.skeleton.base} 18rem
  );
  background-size: 200% 200%;
  background-repeat: no-repeat;

  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.m};
`;

export const ThumbnailCard = styled(SkeletonBase)`
  width: 100%;
  height: 25rem;
  border-radius: 10px;
`;

export const BottomBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.m};
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.s};
`;

export const ProfileSkeleton = styled(SkeletonBase)`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
`;

export const TitleSkeleton = styled(SkeletonBase)`
  width: 13rem;
  height: 2.2rem;
  border-radius: 10px;
`;

export const LikesSkeleton = styled(SkeletonBase)`
  width: 5rem;
  height: 2.2rem;
  border-radius: 10px;
`;
