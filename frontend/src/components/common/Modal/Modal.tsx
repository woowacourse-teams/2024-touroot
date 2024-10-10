import React from "react";
import ReactDOM from "react-dom";

import ModalBody from "@components/common/Modal/ModalBody/ModalBody";
import ModalFooter from "@components/common/Modal/ModalFooter/ModalFooter";
import ModalHeader from "@components/common/Modal/ModalHeader/ModalHeader";

import useBottomSheet from "@hooks/useBottomSheet";
import useModalControl from "@hooks/useModalControl";

import FocusTrap from "../FocusTrap";
import * as S from "./Modal.style";
import { GapSize } from "./Modal.type";

export interface ModalProps extends React.PropsWithChildren {
  onCloseModal: () => void;
  isOpen: boolean;
  position?: "center" | "bottom";
  boxLayoutGap?: GapSize;
}

const Modal = ({
  children,
  onCloseModal,
  isOpen,
  position = "center",
  boxLayoutGap = "m",
}: ModalProps) => {
  useModalControl(isOpen, onCloseModal);
  const { sheetRef, currentY } = useBottomSheet(isOpen, onCloseModal);

  return ReactDOM.createPortal(
    <S.Layout $position={position} $isOpen={isOpen}>
      <S.BackdropLayout onClick={onCloseModal} />
      <FocusTrap onEscapeFocusTrap={onCloseModal}>
        {position === "center" ? (
          <S.ModalBoxLayout $position={position} $gap={boxLayoutGap}>
            {children}
          </S.ModalBoxLayout>
        ) : (
          <S.ModalBoxLayout
            ref={sheetRef}
            $position={position}
            $currentY={currentY}
            $gap={boxLayoutGap}
          >
            {children}
          </S.ModalBoxLayout>
        )}
      </FocusTrap>
    </S.Layout>,
    document.body,
  );
};

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
