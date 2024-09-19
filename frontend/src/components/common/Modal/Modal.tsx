import React from "react";
import ReactDOM from "react-dom";

import ModalBody from "@components/common/Modal/ModalBody/ModalBody";
import ModalFooter from "@components/common/Modal/ModalFooter/ModalFooter";
import ModalHeader from "@components/common/Modal/ModalHeader/ModalHeader";

import useModalControl from "@hooks/useModalControl";

import * as S from "./Modal.style";

export interface ModalProps extends React.PropsWithChildren {
  onCloseModal: () => void;
  isOpen: boolean;
  position?: "center" | "bottom";
}

const Modal = ({ children, onCloseModal, isOpen, position = "center" }: ModalProps) => {
  useModalControl(isOpen, onCloseModal);

  return ReactDOM.createPortal(
    <S.Layout $position={position}>
      <S.BackdropLayout onClick={onCloseModal} />
      <S.ModalBoxLayout $position={position}>{children}</S.ModalBoxLayout>
    </S.Layout>,
    document.querySelector("#root") as HTMLElement,
  );
};

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
