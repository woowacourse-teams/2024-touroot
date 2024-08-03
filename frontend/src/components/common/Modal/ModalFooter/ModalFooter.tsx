import * as S from "./ModalFooter.styled";

export interface ModalFooterProps extends React.PropsWithChildren {
  direction?: React.CSSProperties["flexDirection"];
}

const ModalFooter = ({ children, direction = "row" }: ModalFooterProps) => {
  return <S.Layout $direction={direction}>{children}</S.Layout>;
};

export default ModalFooter;
