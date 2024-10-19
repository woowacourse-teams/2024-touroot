import { useCallback, useEffect, useRef, useState } from "react";

interface AnimationState {
  isVisible: boolean;
  shouldAnimate: boolean;
}

interface UseAnimationObserverProps {
  threshold?: number;
  rootMargin?: string;
}

function useAnimationObserver({
  threshold = 0.1,
  rootMargin = "0px",
}: UseAnimationObserverProps = {}) {
  const refs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [animationStates, setAnimationStates] = useState<{ [key: string]: AnimationState }>({});
  const previousStates = useRef<{ [key: string]: boolean }>({});

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates: { [key: string]: AnimationState } = {};
        entries.forEach((entry) => {
          console.log("entry", entry);
          const key = entry.target.getAttribute("data-animation-key");
          console.log("key", key);
          if (key) {
            const wasVisible = previousStates.current[key];
            const isNowVisible = entry.isIntersecting;

            updates[key] = {
              isVisible: isNowVisible,
              shouldAnimate: isNowVisible && (!wasVisible || !animationStates[key]?.shouldAnimate),
            };

            previousStates.current[key] = isNowVisible;
          }
        });
        setAnimationStates((prev) => ({ ...prev, ...updates }));
      },
      { threshold, rootMargin },
    );

    Object.entries(refs.current).forEach(([key, element]) => {
      if (element) {
        element.setAttribute("data-animation-key", key);
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  const registerElement = useCallback(
    (key: string) => (element: HTMLElement | null) => {
      if (element && !refs.current[key]) {
        refs.current[key] = element;
        element.setAttribute("data-animation-key", key);
        observerRef.current?.observe(element);
        setAnimationStates((prev) => ({
          ...prev,
          [key]: { isVisible: false, shouldAnimate: false },
        }));
        previousStates.current[key] = false;
      }
    },
    [],
  );

  const getAnimationState = useCallback(
    (key: string) => {
      return animationStates[key] || { isVisible: false, shouldAnimate: false };
    },
    [animationStates],
  );

  return { registerElement, getAnimationState };
}

export default useAnimationObserver;
