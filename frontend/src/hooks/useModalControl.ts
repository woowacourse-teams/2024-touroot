import { useEffect } from 'react';
import usePressESC from '@hooks/usePressESC';

/**
 * modal control에 관한 훅입니다.
 * 1. 사용자가 esc를 눌렀을 때 모달이 닫힌다.
 * 2. 사용자가 모달을 열었을 때 외부 스크롤을 하지 못하도록 막는다.
 */
const useModalControl = <T extends (...args: unknown[]) => void>(isOpen: boolean, onToggle: T) => {
  usePressESC(isOpen, onToggle);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
};

export default useModalControl;
