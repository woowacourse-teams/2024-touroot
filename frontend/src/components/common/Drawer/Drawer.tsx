import React, { createContext, useContext, useState } from "react";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";

import * as S from "./Drawer.styled";

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE_MAP.provider);
  }
  return context;
};

const Drawer = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const toggleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  let headerContent: React.ReactNode | null = null;
  let drawerContent: React.ReactNode | null = null;
  const otherContent: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Drawer.Header) {
        headerContent = child;
      } else if (child.type === Drawer.Content) {
        drawerContent = child;
      } else {
        otherContent.push(child);
      }
    }
  });

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {otherContent}
      <S.Overlay isOpen={isOpen} onClick={closeDrawer} />
      <S.DrawerContainer isOpen={isOpen}>
        {headerContent}
        {drawerContent}
      </S.DrawerContainer>
    </DrawerContext.Provider>
  );
};

const Header = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerHeader>{children}</S.DrawerHeader>;
};

const Content = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerContent>{children}</S.DrawerContent>;
};

const Trigger = ({ children }: React.PropsWithChildren) => {
  const { toggleDrawer } = useDrawerContext();
  return (
    <S.TriggerButton onClick={toggleDrawer} aria-label="Toggle drawer">
      {children}
    </S.TriggerButton>
  );
};

Drawer.Header = Header;
Drawer.Content = Content;
Drawer.Trigger = Trigger;

export default Drawer;
