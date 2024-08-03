import useBottomSheet from "@hooks/useBottomSheet";

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
  const { sheetRef, currentY } = useBottomSheet(isOpen, onClose);

  return isOpen ? (
    <section>
      <BackDrop onClose={onClose} />
      <Container ref={sheetRef} currentY={currentY}>
        <Header />
        <Content mainText={mainText} subText={subText} />
        <Footer>
          <Button variants="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variants="primary" onClick={onConfirm}>
            확인
          </Button>
        </Footer>
      </Container>
    </section>
  ) : null;
};

export default ModalBottomSheet;
