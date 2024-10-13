import { useEffect, useRef } from "react";

const DATA_LOAD_COUNT = 5;

const useTravelogueCardFocus = (isFetchingNextPage: boolean) => {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!isFetchingNextPage && cardRefs.current.length > 0) {
      const focusIndex = cardRefs.current.findLastIndex(
        (_, index) => index > 0 && index % DATA_LOAD_COUNT === 0,
      );
      if (focusIndex !== -1 && cardRefs.current[focusIndex]) {
        cardRefs.current[focusIndex]?.focus();
      }
    }
  }, [isFetchingNextPage]);

  return cardRefs;
};

export default useTravelogueCardFocus;
