import React, { PropsWithChildren } from "react";

import * as S from "./ModalContainer.styled";

const ModalContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.ModalContainer>{children}</S.ModalContainer>;
};

export default ModalContainer;
