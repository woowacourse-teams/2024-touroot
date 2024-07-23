import styled from "@emotion/styled";

import type { TextProps } from "./Text";

export const Text = styled.p<{ $textType: TextProps["textType"] }>`
  ${({ theme, $textType = "body" }) => theme.typography.mobile[$textType]}
`;
