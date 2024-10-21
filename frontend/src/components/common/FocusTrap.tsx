import React, { useEffect, useRef } from "react";

const getFocusableElements = (element: HTMLElement | null): HTMLElement[] => {
  if (!element) return [];

  const focusableSelectors = [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    '[tabindex]:not([tabindex="-1"])',
    "li",
  ].join(",");

  return Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
  );
};

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactElement;
  onEscapeFocusTrap?: () => void;
}

const FocusTrap = <T extends HTMLElement>({ children, onEscapeFocusTrap, ...props }: Props) => {
  const focusTrapRef = useRef<T>(null);
  const child = React.Children.only(children);
  const focusableElements = useRef<(HTMLElement | null)[]>([]);

  const currentFocusIndex = useRef(-1);

  useEffect(() => {
    if (focusTrapRef.current) {
      focusableElements.current = getFocusableElements(focusTrapRef.current);
    }

    return () => {
      focusableElements.current = [];
    };
  }, []);

  useEffect(() => {
    const focusNextElement = () => {
      currentFocusIndex.current =
        (currentFocusIndex.current + 1) % focusableElements.current.length;
      focusableElements.current[currentFocusIndex.current]?.focus();
    };

    const focusPrevElement = () => {
      currentFocusIndex.current =
        (currentFocusIndex.current - 1 + focusableElements.current.length) %
        focusableElements.current.length;
      focusableElements.current[currentFocusIndex.current]?.focus();
    };

    const handleTabKeyDown = (event: KeyboardEvent) => {
      const isTabKeyDown = !event.shiftKey && event.key === "Tab";
      if (!isTabKeyDown) return;

      event.preventDefault();
      focusNextElement();
    };

    const handleShiftTabKeyDown = (event: KeyboardEvent) => {
      const isShiftTabKeyDown = event.shiftKey && event.key === "Tab";
      if (!isShiftTabKeyDown) return;

      event.preventDefault();
      focusPrevElement();
    };

    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onEscapeFocusTrap) {
        onEscapeFocusTrap();
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      handleTabKeyDown(event);
      handleShiftTabKeyDown(event);
      onEscapeFocusTrap && handleEscapeKeyDown(event);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [onEscapeFocusTrap]);

  const Component = React.cloneElement(child, {
    ...{ ...props, ...child?.props },
    ref: focusTrapRef,
  });

  return <>{Component}</>;
};

export default FocusTrap;
