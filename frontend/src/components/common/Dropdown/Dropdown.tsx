import React, { PropsWithChildren } from "react";

import * as S from "./Dropdown.styled";
import { DropdownPosition, DropdownSize } from "./Dropdown.type";

interface DropdownProps {
  isOpen: boolean;
  size: DropdownSize;
  position: DropdownPosition;
}

const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({
  isOpen,
  size,
  position,
  children,
}) => {
  return isOpen ? (
    <S.Dropdown $size={size} $position={position}>
      {children}
    </S.Dropdown>
  ) : null;
};

export default Dropdown;
