import * as S from "./BackDrop.styled";

interface BackDropProps {
  onClose: () => void;
}

const BackDrop = ({ onClose }: BackDropProps) => {
  return <S.BackDrop onClick={onClose} />;
};

export default BackDrop;
