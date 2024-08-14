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
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalBottomSheet = ({
  mainText,
  subText,
  isOpen,
  primaryButtonLabel,
  secondaryButtonLabel,
  onClose,
  onConfirm,
}: ModalBottomSheetProps) => {
  const { sheetRef, currentY } = useBottomSheet(isOpen, onClose);

  return (
    <section>
      <BackDrop onClose={onClose} />
      <Container ref={sheetRef} currentY={currentY}>
        <Header />
        <Content mainText={mainText} subText={subText} />
        <Footer>
          <Button variants="secondary" onClick={onClose}>
            {secondaryButtonLabel}
          </Button>
          <Button variants="primary" onClick={onConfirm}>
            {primaryButtonLabel}
          </Button>
        </Footer>
      </Container>
    </section>
  );
};

export default ModalBottomSheet;
