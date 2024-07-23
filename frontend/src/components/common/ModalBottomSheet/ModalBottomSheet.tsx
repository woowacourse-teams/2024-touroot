import { useCallback, useEffect, useRef, useState } from "react";

import Button from "../Button/Button";
import BackDrop from "./BackDrop/BackDrop";
import Container from "./Container/Container";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export interface ModalBottomSheetProps {
  mainText: string;
  subText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalBottomSheet = ({
  mainText,
  subText,
  isOpen,
  onClose,
  onConfirm,
}: ModalBottomSheetProps) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number>(0);
  const sheetRef = useRef<HTMLDivElement | null>(null);

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
    };

    const handleEnd = () => {
      if (currentY > 150) {
        onClose();
      } else {
        setCurrentY(0);
      }
      setStartY(null);
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const handleTouchEnd = handleEnd;

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientY);
    const handleMouseMove = (e: MouseEvent) => {
      if (startY !== null) {
        handleMove(e.clientY);
      }
    };
    const handleMouseUp = handleEnd;

    // Keyboard events

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

  return isOpen ? (
    <section>
      <BackDrop onClose={onClose} />
      <Container ref={sheetRef} currentY={currentY}>
        <Header />
        <Content mainText={mainText} subText={subText} />
        <Footer>
          <Button color="white" label="취소" onClick={onClose} />
          <Button color="primary" label="확인" onClick={onConfirm} />
        </Footer>
      </Container>
    </section>
  ) : null;
};

export default ModalBottomSheet;
