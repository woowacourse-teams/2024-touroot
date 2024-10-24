import { useEffect } from "react";

import usePressESC from "@hooks/usePressESC";

/**
 * modal control에 관한 훅입니다.
 * 1. 사용자가 esc를 눌렀을 때 모달이 닫힌다.
 * 2. 사용자가 모달을 열었을 때 외부 스크롤을 하지 못하도록 막는다.
 */
const useModalControl = <T extends (...args: unknown[]) => void>(isOpen: boolean, onToggle: T) => {
  usePressESC(isOpen, onToggle);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";

      document.body.style.touchAction = "none";

      return () => {
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.body.style.overflow = "auto";
        document.body.style.touchAction = "";

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
};

export default useModalControl;
