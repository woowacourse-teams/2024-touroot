import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { ModalHeaderProps } from "./ModalHeader";

const createPosition = ($position: Required<ModalHeaderProps>["headerPosition"]) => {
  const position = {
    left: css`
      justify-content: flex-start;
    `,

    right: css`
      justify-content: flex-end;
    `,

    center: css`
      justify-content: center;
    `,
  };

  return position[$position];
};

export const Layout = styled.header<{ $position: Required<ModalHeaderProps>["headerPosition"] }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ $position }) => createPosition($position)};

  width: 100%;
`;
