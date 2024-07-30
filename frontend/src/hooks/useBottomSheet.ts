import { useCallback, useEffect, useRef, useState } from "react";

const useBottomSheet = (isOpen: boolean, onClose: () => void) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number>(0);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentY(0);
    } else setCurrentY(350);
  }, [isOpen]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const handleStart = (clientY: number) => {
      setStartY(clientY);
    };

    const handleMove = (clientY: number) => {
      if (startY === null) return;

      const diff = clientY - startY;
      if (diff > 0) {
        setCurrentY(diff);
      }
      console.log(currentY);
    };

    const handleEnd = () => {
      if (currentY > 200) {
        onClose();
      } else {
        setCurrentY(0);
      }
      setStartY(null);
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientY);
    };
    const handleTouchEnd = handleEnd;

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientY);
    const handleMouseMove = (e: MouseEvent) => {
      if (startY !== null) {
        handleMove(e.clientY);
      }
    };
    const handleMouseUp = handleEnd;

    sheet.addEventListener("touchstart", handleTouchStart);
    sheet.addEventListener("touchmove", handleTouchMove);
    sheet.addEventListener("touchend", handleTouchEnd);

    sheet.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);

      sheet.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [startY, currentY, onClose]);

  // Keyboard events
  const handleClickEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleClickEsc);

    return () => {
      document.removeEventListener("keydown", handleClickEsc);
    };
  }, [handleClickEsc]);

  return {
    sheetRef,
    currentY,
  };
};

export default useBottomSheet;
