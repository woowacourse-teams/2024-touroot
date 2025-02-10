import * as S from "./ModalHeader.styled";

export interface ModalHeaderProps extends React.PropsWithChildren {
  headerPosition?: "left" | "right" | "center";
}

const ModalHeader = ({ children, headerPosition = "right" }: ModalHeaderProps) => {
  return <S.Layout $position={headerPosition}>{children}</S.Layout>;
};

export default ModalHeader;
