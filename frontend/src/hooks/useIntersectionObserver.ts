import { useEffect, useRef } from "react";

type UseIntersectionObserverProps = () => void;

const useIntersectionObserver = (fetchFn: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const options = {
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchFn();
      }
    }, options);

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchFn]);

  return { lastElementRef };
};

export default useIntersectionObserver;
