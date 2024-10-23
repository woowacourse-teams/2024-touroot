import { useEffect, useState } from "react";

interface useUnmountAnimationProps {
  isOpen: boolean;
  animationDuration?: number;
}

const useUnmountAnimation = ({ isOpen, animationDuration = 300 }: useUnmountAnimationProps) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  return { isRendered };
};

export default useUnmountAnimation;
