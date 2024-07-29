import { PropsWithChildren, useState } from "react";

import { DownArrow, UpArrow } from "@assets/svg";

import * as S from "./TransformBottomSheet.styled";

interface TransformBottomSheetProps {
  hasBottomButton?: boolean;
  buttonLabel: string;
}

const TransformBottomSheet = ({
  children,
  buttonLabel,
  hasBottomButton = true,
}: PropsWithChildren<TransformBottomSheetProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.BottomSheetLayout $isOpen={isOpen}>
      {isOpen && (
        <>
          <button onClick={handleClick}>
            <DownArrow />
          </button>
          <S.BottomSheetContent>{children}</S.BottomSheetContent>
          {hasBottomButton && (
            <S.BottomSheetBottomContainer>
              <S.BottomSheetButton>{buttonLabel}</S.BottomSheetButton>
            </S.BottomSheetBottomContainer>
          )}
        </>
      )}
      <button onClick={handleClick}>
        <UpArrow />
      </button>
    </S.BottomSheetLayout>
  );
};

export default TransformBottomSheet;
