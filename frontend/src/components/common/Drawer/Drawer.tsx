import React, { useState } from "react";

import DrawerProvider, { useDrawerContext } from "@contexts/DrawerProvider";

import * as S from "./Drawer.styled";

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
    <DrawerProvider
      isOpen={isOpen}
      openDrawer={openDrawer}
      closeDrawer={closeDrawer}
      toggleDrawer={toggleDrawer}
    >
      {otherContent}
      <S.Overlay isOpen={isOpen} onClick={closeDrawer} />
      <S.DrawerContainer isOpen={isOpen}>
        {headerContent}
        {drawerContent}
      </S.DrawerContainer>
    </DrawerProvider>
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
