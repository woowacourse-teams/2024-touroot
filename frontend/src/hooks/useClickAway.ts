import { RefObject, useEffect } from "react";

const useClickAway = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onClickAway: (event: Event) => void,
  eventType: keyof DocumentEventMap = "mouseup",
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway(event);
      }
    };

    document.addEventListener(eventType, handleClickOutside);
    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, onClickAway, eventType]);
};

export default useClickAway;
