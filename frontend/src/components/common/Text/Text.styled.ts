import styled from "@emotion/styled";

import type { TextProps } from "./Text";

export const Text = styled.p<{
  $textType: TextProps["textType"];
  $isInline: TextProps["isInline"];
}>`
  ${({ theme, $textType = "body" }) => theme.typography.mobile[$textType]}
  ${({ $isInline }) => ($isInline === true ? "display: inline" : "")}
`;
