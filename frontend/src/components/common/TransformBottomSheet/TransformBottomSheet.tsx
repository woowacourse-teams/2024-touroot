import { PropsWithChildren, useState } from "react";

import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import * as S from "./TransformBottomSheet.styled";

interface TransformBottomSheetProps {
  buttonLabel: string;
  onTransform?: () => void;
}

const TransformBottomSheet = ({
  children,
  buttonLabel,
  onTransform,
}: PropsWithChildren<TransformBottomSheetProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.BottomSheetLayout $isOpen={isOpen}>
      {isOpen ? (
        <>
          <IconButton iconType="down-arrow" onClick={handleToggle} size="12" />
          {children}
          <S.BottomSheetButtonWrapper>
            <Button variants="primary" onClick={onTransform}>
              {buttonLabel}
            </Button>
          </S.BottomSheetButtonWrapper>
        </>
      ) : (
        <IconButton iconType="up-arrow" onClick={handleToggle} size="12" />
      )}
    </S.BottomSheetLayout>
  );
};

export default TransformBottomSheet;
