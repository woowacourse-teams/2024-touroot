import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import { DropdownPosition, DropdownSize } from "./Dropdown.type";

const dropdownSize = {
  small: "30%",
  medium: "50%",
  large: "100%",
};

const dropdownPosition = {
  left: "left: 0;",
  center: `left: 50%;
  transform: translateX(-50%);
  `,
  right: "right: 0;",
};

export const Dropdown = styled.div<{ $size: DropdownSize; $position: DropdownPosition }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.4rem;
  ${({ $position }) => dropdownPosition[$position]}
  gap: 1.6rem;

  width: ${({ $size }) => dropdownSize[$size]};
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 25%);

  background-color: ${PRIMITIVE_COLORS.white};
`;
