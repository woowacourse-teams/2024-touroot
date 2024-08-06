import { createContext, useContext } from "react";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE_MAP.provider);
  }
  return context;
};

interface DrawerProviderProps {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerProvider = ({
  isOpen,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  children,
}: React.PropsWithChildren<DrawerProviderProps>) => {
  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
