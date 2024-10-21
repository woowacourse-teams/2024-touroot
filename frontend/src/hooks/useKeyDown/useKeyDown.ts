import { useEffect, useRef, useState } from "react";

import KEY_ACTIONS from "./constants";
import { isArrowKey, isHorizontalKey, isVerticalKey } from "./utils";

interface UseKeyDownProps {
  isOpen: boolean;
  direction?: "vertical" | "horizontal";
  useDynamicObserver?: boolean;
}

const useKeyDown = <T extends HTMLElement = HTMLDivElement>({
  isOpen,
  direction = "vertical",
  useDynamicObserver = false,
}: UseKeyDownProps) => {
  const modalRef = useRef<T>(null);
  const focusableElements = useRef<HTMLElement[]>([]);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);

  const updateFocusableElements = () => {
    if (!modalRef.current) return;

    focusableElements.current = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
  };

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    updateFocusableElements();
    setCurrentFocusIndex(0);
    focusableElements.current[0]?.focus();

    if (useDynamicObserver) {
      const observer = new MutationObserver(updateFocusableElements);
      observer.observe(modalRef.current, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, [isOpen, useDynamicObserver]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    const { key } = event;
    if (!isArrowKey(key)) return;

    event.preventDefault();

    let increment = 1;
    if (direction === "vertical" && isVerticalKey(key)) {
      increment = KEY_ACTIONS.vertical[key];
    } else if (direction === "horizontal" && isHorizontalKey(key)) {
      increment = KEY_ACTIONS.horizontal[key];
    }

    const length = focusableElements.current.length;
    const nextIndex = (currentFocusIndex + increment + length) % length;

    if (nextIndex !== currentFocusIndex) {
      setCurrentFocusIndex(nextIndex);
      focusableElements.current[nextIndex]?.focus();
    }
  };

  return { modalRef, handleKeyDown };
};

export default useKeyDown;
