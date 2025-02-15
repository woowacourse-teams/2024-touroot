import React from "react";
import ReactDOM from "react-dom";

import DrawerProvider, { useDrawerContext } from "@contexts/DrawerProvider";

import useModalControl from "@hooks/useModalControl";
import usePressESC from "@hooks/usePressESC";
import useToggle from "@hooks/useToggle";
import useUnmountAnimation from "@hooks/useUnmountAnimation";

import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import * as S from "./Drawer.styled";

const Drawer = ({ children }: React.PropsWithChildren) => {
  const [isOpen, , , toggle] = useToggle();

  usePressESC(isOpen, toggle);
  useModalControl(isOpen, toggle);

  const { isRendered } = useUnmountAnimation({ isOpen });

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
    <DrawerProvider isOpen={isOpen} toggleDrawer={toggle}>
      <VisuallyHidden aria-live="assertive">
        {isOpen ? "사용자 메뉴가 열렸습니다." : "사용자 메뉴가 닫혔습니다."}
      </VisuallyHidden>
      {otherContent}

      {isRendered &&
        ReactDOM.createPortal(
          <>
            <S.Overlay isOpen={isOpen} onClick={toggle} />
            <S.DrawerContainer id="drawer-content" isOpen={isOpen} aria-modal="true" role="dialog">
              {headerContent}
              {drawerContent}
            </S.DrawerContainer>
          </>,
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

interface TriggerProps
  extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  onClick?: (event: React.MouseEvent) => void;
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
