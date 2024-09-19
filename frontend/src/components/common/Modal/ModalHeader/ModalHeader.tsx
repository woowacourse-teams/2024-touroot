import * as S from "./ModalHeader.styled";

export interface ModalHeaderProps extends React.PropsWithChildren {
  buttonPosition?: "left" | "right" | "center";
}

const ModalHeader = ({ children, buttonPosition = "right" }: ModalHeaderProps) => {
  return <S.Layout $position={buttonPosition}>{children}</S.Layout>;
};

export default ModalHeader;
