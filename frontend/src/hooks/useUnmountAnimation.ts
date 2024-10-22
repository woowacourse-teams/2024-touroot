import { useEffect, useState } from "react";

interface useUnmountAnimationProps {
  isOpen: boolean;
  animationDuration?: number;
}

const useUnmountAnimation = ({ isOpen, animationDuration = 300 }: useUnmountAnimationProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  return { shouldRender };
};

export default useUnmountAnimation;
