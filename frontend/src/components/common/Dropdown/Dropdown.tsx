import React, { PropsWithChildren } from "react";

import * as S from "./Dropdown.styled";
import type { DropdownPosition, DropdownSize } from "./Dropdown.type";

interface DropdownProps {
  size: DropdownSize;
  position: DropdownPosition;
}

const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({ size, position, children }) => {
  return (
    <S.Dropdown $size={size} $position={position}>
      {children}
    </S.Dropdown>
  );
};

export default Dropdown;
