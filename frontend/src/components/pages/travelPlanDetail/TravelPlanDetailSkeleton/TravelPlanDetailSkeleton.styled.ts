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
  gap: ${({ theme }) => theme.spacing.s};
`;

export const SummaryTitleContainer = styled.div`
  margin: 3.2rem 1.6rem 1.6rem;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  padding: 0 1.6rem;
  gap: ${({ theme }) => theme.spacing.s};
`;

export const ContentContainer = styled.div`
  margin-top: 2rem;
  padding: 0 1.6rem;
`;

export const PlaceContainer = styled.div`
  margin-bottom: 2rem;
`;

export const PlaceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
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
