import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-y: auto;
`;

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 260vh;
`;

export const firstPageStyle = css`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const secondPageStyle = css`
  position: absolute;
  top: 100vh;
  z-index: 2;
  width: 100%;
  transition: transform 0.1s ease-out;
`;
