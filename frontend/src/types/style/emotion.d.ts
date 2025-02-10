import "@emotion/react";

import { ANIMATION, SEMANTIC_COLORS, SPACING, TYPOGRAPHY, Z_INDEX } from "@styles/tokens";

declare module "@emotion/react" {
  export interface Theme {
    typography: typeof TYPOGRAPHY;
    colors: typeof SEMANTIC_COLORS;
    spacing: typeof SPACING;
    zIndex: typeof Z_INDEX;
    animation: typeof ANIMATION;
  }
}
