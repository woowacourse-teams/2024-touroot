import styled from "@emotion/styled";

import type { TextProps } from "./Text";

const Text = styled.p<{ $textType: TextProps["textType"] }>`
  ${({ theme, $textType = "body" }) => theme.typography.mobile[$textType]}
`;

export { Text };
