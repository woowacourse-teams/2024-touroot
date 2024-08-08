import { css } from "@emotion/react";

import theme from "@styles/theme";

export const registerButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: max(2rem, calc(50% - 48rem / 2 + 2rem));
  bottom: 2rem;
  z-index: ${theme.zIndex.floatingButton};

  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  background-color: ${theme.colors.primary};
`;
