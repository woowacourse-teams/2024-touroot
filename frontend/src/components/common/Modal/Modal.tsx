import { PropsWithChildren } from "react";

export interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ isOpen, children }) => {
  return isOpen ? <section>{children}</section> : null;
};

export default Modal;
