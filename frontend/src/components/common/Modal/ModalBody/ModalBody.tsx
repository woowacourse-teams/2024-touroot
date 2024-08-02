import { HTMLAttributes } from "react";

import * as S from "./ModalBody.styled";

interface ModalBodyProps extends React.PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  direction?: React.CSSProperties["flexDirection"];
}

const ModalBody = ({ children, direction = "row", ...props }: ModalBodyProps) => {
  return (
    <S.Layout $direction={direction} {...props}>
      {children}
    </S.Layout>
  );
};

export default ModalBody;
