import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);

  width: 100%;
  padding: 2.4rem;
  border-radius: 10px 10px 0px 0px;

  background-color: ${PRIMITIVE_COLORS.white};
`;
