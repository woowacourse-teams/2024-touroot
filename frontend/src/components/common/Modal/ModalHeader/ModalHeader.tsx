import { CloseButton } from "@assets/svg";

import * as S from "./ModalHeader.styled";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader = ({ onClose }: ModalHeaderProps) => {
  return (
    <S.ModalHeader>
      <button onClick={onClose}>
        <CloseButton />
      </button>
    </S.ModalHeader>
  );
};

export default ModalHeader;
