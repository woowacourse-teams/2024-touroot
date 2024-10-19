import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  margin: -5rem 0;
`;

export const TextWrapper = styled.div<{ $variants: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-40%);

  left: 10%;

  color: ${({ theme, $variants }) =>
    $variants === "left" ? PRIMITIVE_COLORS.white : theme.colors.text.primary};
`;

export const NameWrapper = styled.div<{ $variants: "left" | "right" }>`
  display: flex;
  justify-content: ${({ $variants }) => ($variants === "left" ? "flex-start" : "flex-end")};
  width: 100%;
  ${({ $variants }) => ($variants === "left" ? "padding-left: 10%;" : "padding-right: 10%;")}
`;

export const fontWeightMediumStyle = css`
  font-weight: 500;
`;
