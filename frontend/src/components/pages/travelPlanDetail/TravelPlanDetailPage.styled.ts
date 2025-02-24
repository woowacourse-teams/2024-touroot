import { css } from "@emotion/react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

export const TravelPlanDetailLayout = styled.section`
  padding-bottom: 10rem;
`;

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

export const DropdownButton = styled.button`
  display: flex;

  width: 100%;
`;

export const titleStyle = css`
  line-height: 2.4rem;
`;

export const summaryTitleStyle = css`
  margin: 3rem 1.6rem;
`;

export const dateStyle = css`
  margin: 3rem 1.6rem;
  margin-bottom: 3rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 1.6rem;
  gap: ${({ theme }) => theme.spacing.m};
`;

export const transformBottomSheetTextStyle = css`
  ${theme.typography.mobile.detailBold}
`;
