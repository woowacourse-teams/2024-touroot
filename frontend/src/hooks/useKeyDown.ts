import { useEffect, useRef, useState } from "react";

import type {
  ArrowKey,
  Direction,
  HorizontalKey,
  IncrementValue,
  KeyActions,
  VerticalKey,
} from "@type/domain/keyboardNavigation";

interface UseKeyDownProps {
  isOpen: boolean;
  direction?: Direction;
}
const isVerticalKey = (key: unknown): key is VerticalKey => {
  return key === "ArrowDown" || key === "ArrowUp";
};

const isHorizontalKey = (key: unknown): key is HorizontalKey => {
  return key === "ArrowRight" || key === "ArrowLeft";
};

const isArrowKey = (key: unknown): key is ArrowKey => {
  return isVerticalKey(key) || isHorizontalKey(key);
};

const keyActions: KeyActions = {
  vertical: {
    ArrowDown: 1,
    ArrowUp: -1,
  },
  horizontal: {
    ArrowRight: 1,
    ArrowLeft: -1,
  },
};

const useKeyDown = ({ isOpen, direction = "vertical" }: UseKeyDownProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusableElements = useRef<HTMLElement[]>([]);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);

  // useEffect(() => {
  //   if (isOpen && modalRef.current) {
  //     focusableElements.current = Array.from(
  //       modalRef.current.querySelectorAll<HTMLElement>(
  //         'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  //       ),
  //     );
  //     setCurrentFocusIndex(0);
  //     focusableElements.current[0]?.focus();
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const observer = new MutationObserver(() => {
        focusableElements.current = Array.from(
          modalRef.current!.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        );
      });

      observer.observe(modalRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    const { key } = event;

    if (!isArrowKey(key)) return;

    event.preventDefault();

    let increment: IncrementValue = 1;

    if (direction === "vertical" && isVerticalKey(key)) {
      increment = keyActions.vertical[key];
    } else if (direction === "horizontal" && isHorizontalKey(key)) {
      increment = keyActions.horizontal[key];
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
