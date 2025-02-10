import { useEffect, useRef, useState } from "react";

const BOTTOM_SHEET = {
  openPosition: 0,
  closedPosition: 350,
  closeThreshold: 200,
};

const useBottomSheet = (isOpen: boolean, onClose: () => void) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number>(BOTTOM_SHEET.closedPosition);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) setCurrentY(BOTTOM_SHEET.openPosition);
    else setCurrentY(BOTTOM_SHEET.closedPosition);
  }, [isOpen]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const handleStart = (clientY: number) => setStartY(clientY);

    const handleMove = (clientY: number) => {
      if (startY === null) return;

      const diff = clientY - startY;
      if (diff > 0) {
        setCurrentY(diff);
      }
    };

    const handleEnd = () => {
      if (currentY > BOTTOM_SHEET.closeThreshold) {
        onClose();
      } else {
        setCurrentY(BOTTOM_SHEET.openPosition);
      }
      setStartY(null);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touchedYPosition = e.touches[0].clientY;

      handleStart(touchedYPosition);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const touchedYPosition = e.touches[0].clientY;

      handleMove(touchedYPosition);
    };
    const handleTouchEnd = handleEnd;

    const handleMouseDown = (e: MouseEvent) => {
      const clickedYPosition = e.clientY;

      handleStart(clickedYPosition);
    };
    const handleMouseMove = (e: MouseEvent) => {
      const clickedYPosition = e.clientY;

      if (startY !== null) {
        handleMove(clickedYPosition);
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

  return {
    sheetRef,
    currentY,
  };
};

export default useBottomSheet;
