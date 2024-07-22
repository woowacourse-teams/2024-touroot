import { PropsWithChildren } from "react";

import * as S from "./ModalFooter.styled";

const ModalFooter: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.ModalFooter>{children}</S.ModalFooter>;
};

export default ModalFooter;
