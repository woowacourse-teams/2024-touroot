import { css } from "@emotion/react";
import styled from "@emotion/styled";

const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  align-self: center;
  min-height: calc(100vh - 7.6rem);
  padding: 0 ${({ theme }) => theme.spacing.m};
`;

export const ImageWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;

export const TextContainer = styled.div`
  ${flexColumnCenter}
  gap: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

export const Title = styled.div`
  ${flexColumnCenter}
  gap:${({ theme }) => theme.spacing.l};
`;

export const DescriptionContainer = styled.div`
  ${flexColumnCenter}
  color: ${({ theme }) => theme.colors.text.secondary};
  gap: ${({ theme }) => theme.spacing.s};
`;

export const ButtonContainer = styled.div`
  ${flexColumnCenter}
  gap: ${({ theme }) => theme.spacing.s};
  width: 100%;
`;
