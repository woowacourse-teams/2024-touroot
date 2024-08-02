import React from "react";
import ReactDOM from "react-dom";

import ModalProvider from "@contexts/ModalProvider";

import ModalBody from "@components/common/Modal/ModalBody/ModalBody";
import ModalFooter from "@components/common/Modal/ModalFooter/ModalFooter";
import ModalHeader from "@components/common/Modal/ModalHeader/ModalHeader";

import useModalControl from "@hooks/useModalControl";

import * as S from "./Modal.style";

interface ModalProps extends React.PropsWithChildren {
  onCloseModal: () => void;
  isOpen: boolean;
}

const Modal = ({ children, onCloseModal, isOpen }: ModalProps) => {
  useModalControl(isOpen, onCloseModal);

  return ReactDOM.createPortal(
    <ModalProvider onCloseModal={onCloseModal}>
      <S.Layout>
        <S.BackdropLayout onClick={onCloseModal} />
        <S.ModalBoxLayout>{children}</S.ModalBoxLayout>
      </S.Layout>
    </ModalProvider>,
    document.querySelector("#root") as HTMLElement,
  );
};

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
