import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TitleLayout = styled.section`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.m};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  gap: ${({ theme }) => theme.spacing.m};

  width: 100%;
  padding: 0 1.6rem;
`;

export const AuthorDateContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const IconButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LikesContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

export const MoreContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;

  width: 100%;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const ContentContainer = styled.div`
  margin-top: 3rem;
`;

export const titleStyle = css`
  line-height: 2.4rem;
`;

export const authorDateStyle = css`
  color: ${theme.colors.text.secondary};
`;

export const cursorPointerStyle = css`
  cursor: pointer;
`;

export const summaryTitleStyle = css`
  margin: 1.6rem 0 3.2rem;
`;
