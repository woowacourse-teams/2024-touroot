import { useEffect, useRef } from "react";

const useScrollAnimation = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const secondPage = pageRef.current;

      if (secondPage) {
        const translateY = Math.max(-11, 70 - ((scrollPosition / window.innerHeight) * 100 + 70));
        secondPage.style.transform = `translateY(${translateY}vh)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [pageRef] as const;
};

export default useScrollAnimation;
