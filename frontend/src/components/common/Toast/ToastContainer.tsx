import Toast from "@components/common/Toast/Toast";
import { ToastStatus } from "@components/common/Toast/Toast.type";

import * as S from "./Toast.styled";

interface ToastContainerProps {
  message: string;
  isOpen: boolean;
  status?: ToastStatus;
  rectDetail: DOMRect | null;
}

const ToastContainer = ({ status = "error", message, isOpen, rectDetail }: ToastContainerProps) => {
  return (
    <S.ToastContainerLayout $rect={rectDetail} $isOpen={isOpen}>
      <Toast status={status} message={message} />
    </S.ToastContainerLayout>
  );
};

export default ToastContainer;
