import "@emotion/react";

import { SEMANTIC_COLORS, TYPOGRAPHY } from "@styles/tokens";
import { SPACING } from "@styles/tokens/spacing";

declare module "@emotion/react" {
  export interface Theme {
    typography: typeof TYPOGRAPHY;
    colors: typeof SEMANTIC_COLORS;
    spacing: typeof SPACING;
  }
}
