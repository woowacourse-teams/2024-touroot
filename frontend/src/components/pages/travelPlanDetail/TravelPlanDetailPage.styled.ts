import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.m};

  width: 100%;
  margin-top: 3.2rem;
  padding: 0 1.6rem;
`;

export const IconButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;

  width: 100%;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const titleStyle = css`
  line-height: 2.4rem;
`;

export const cursorPointerStyle = css`
  cursor: pointer;
`;

export const summaryTitleStyle = css`
  margin: 3.2rem 1.6rem 1.6rem;
`;
