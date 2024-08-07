import { createContext, useCallback, useContext, useRef, useState } from "react";

import { ToastStatus } from "components/common/Toast/Toast.type";

import ToastContainer from "@components/common/Toast/ToastContainer";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import { ANIMATION_DURATION, TOAST_DISPLAY_DURATION } from "./ToastProvider.constant";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ToastContext = createContext((_showToastParams: ShowToastParams) => {});

export const useToastContext = () => {
  const value = useContext(ToastContext);

  if (!value) throw new Error(ERROR_MESSAGE_MAP.provider);

  return value;
};

interface ShowToastParams {
  message: string;
  rectDetail: DOMRect;
  status?: ToastStatus;
}

const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ToastStatus>("error");
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [isRemove, setIsRemove] = useState(true);
  const [rectDetail, setRectDetail] = useState<DOMRect | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback(({ message, rectDetail, status = "error" }: ShowToastParams) => {
    setIsRemove(false);
    setIsOpenToast(true);
    setMessage(message);
    setStatus(status);
    setRectDetail(rectDetail);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setTimeout(() => {
        setMessage("");
        setIsRemove(true);
      }, ANIMATION_DURATION);
    }, TOAST_DISPLAY_DURATION);

    toastTimer.current = timer;
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {!isRemove && (
        <ToastContainer
          rectDetail={rectDetail}
          status={status}
          isOpen={isOpenToast}
          message={message}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
