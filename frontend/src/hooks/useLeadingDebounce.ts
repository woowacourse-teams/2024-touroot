import { useState } from "react";

const useLeadingDebounce = (callback: () => void, delay: number) => {
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedCallback = () => {
    if (!isDebouncing) {
      callback();
      setIsDebouncing(true);
      setTimeout(() => {
        setIsDebouncing(false);
      }, delay);
    }
  };

  return debouncedCallback;
};

export default useLeadingDebounce;
