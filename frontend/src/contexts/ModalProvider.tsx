import { createContext, useContext } from "react";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

export const OnCloseModalContext = createContext(() => {});

export interface UserProviderProps extends React.PropsWithChildren {
  onCloseModal: () => void;
}

const ModalProvider = ({ children, onCloseModal }: UserProviderProps) => {
  return (
    <OnCloseModalContext.Provider value={onCloseModal}>{children}</OnCloseModalContext.Provider>
  );
};

export default ModalProvider;

export const useModalContext = () => {
  const onCloseModal = useContext(OnCloseModalContext);

  if (!onCloseModal) throw new Error(ERROR_MESSAGE_MAP.provider);

  return onCloseModal;
};
