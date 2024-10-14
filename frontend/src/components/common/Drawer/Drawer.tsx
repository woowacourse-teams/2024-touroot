import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";

import DrawerProvider, { useDrawerContext } from "@contexts/DrawerProvider";

import useModalControl from "@hooks/useModalControl";
import usePressESC from "@hooks/usePressESC";

import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import * as S from "./Drawer.styled";

const Drawer = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);
  usePressESC(isOpen, toggleDrawer);

  useModalControl(isOpen, toggleDrawer);

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
    <DrawerProvider isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <VisuallyHidden aria-live="assertive">
        {isOpen ? "사용자 메뉴 모달이 열렸습니다." : "사용자 메뉴 모달이 닫혔습니다."}
      </VisuallyHidden>
      {otherContent}
      <S.Overlay isOpen={isOpen} onClick={toggleDrawer} />
      {isOpen &&
        ReactDOM.createPortal(
          <S.DrawerContainer id="drawer-content" isOpen={isOpen} aria-modal="true" role="dialog">
            {headerContent}
            {drawerContent}
          </S.DrawerContainer>,
          document.body,
        )}
    </DrawerProvider>
  );
};

const Header = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerHeader>{children}</S.DrawerHeader>;
};

const Content = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerContent>{children}</S.DrawerContent>;
};

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Trigger = ({ children, onClick }: TriggerProps) => {
  const { toggleDrawer } = useDrawerContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleDrawer();
    onClick?.(event);
  };

  return (
    <S.TriggerButton type="button" onClick={handleClick}>
      {children}
    </S.TriggerButton>
  );
};

Drawer.Header = Header;
Drawer.Content = Content;
Drawer.Trigger = Trigger;

export default Drawer;
