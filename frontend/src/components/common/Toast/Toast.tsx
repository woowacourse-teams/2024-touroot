import Icon from "@components/common/Icon/Icon";
import { ToastStatus } from "@components/common/Toast/Toast.type";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./Toast.styled";

interface ToastProps {
  message: string;
  status?: ToastStatus;
}

const TOAST_ICON_MAP = {
  error: <Icon color={PRIMITIVE_COLORS.white} size="20" iconType="error-circle" />,
  success: <Icon color={PRIMITIVE_COLORS.white} size="16" iconType="check-circle" />,
};

const Toast = ({ status = "error", message }: ToastProps) => {
  return (
    <S.ToastLayout $status={status}>
      {TOAST_ICON_MAP[status]}
      {message}
    </S.ToastLayout>
  );
};

export default Toast;
