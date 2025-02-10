import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    margin-bottom: 0.2rem;
  }
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.mobile.bodyBold}
`;

export const visualHiddenStyle = css`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;

  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;
