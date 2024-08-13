import { useEffect, useRef } from "react";

const useLeadingDebounce = (callback: () => void, delay: number) => {
  const isDebouncing = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = () => {
    const isDebounceReady = !isDebouncing.current;
    const isExistingTimerActive = isDebounceReady && timeoutRef.current;

    if (isExistingTimerActive) clearTimeout(timeoutRef.current);

    if (isDebounceReady) {
      callback();
      isDebouncing.current = true;

      timeoutRef.current = setTimeout(() => {
        isDebouncing.current = false;
      }, delay);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export default useLeadingDebounce;
