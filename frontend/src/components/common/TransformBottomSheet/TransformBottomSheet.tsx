import { PropsWithChildren } from "react";

import { Button, Text } from "@components/common";

import * as S from "./TransformBottomSheet.styled";

interface TransformBottomSheetProps {
  buttonLabel: string;
  travelPrompt: string;
  onTransform?: () => void;
}

const TransformBottomSheet = ({
  children,
  travelPrompt,
  buttonLabel,
  onTransform,
}: PropsWithChildren<TransformBottomSheetProps>) => {
  return (
    <S.BottomSheetLayout>
      <Text textType="detailBold">{travelPrompt}</Text>
      <S.BottomSheetButtonContainer>
        {children}
        <Button variants="primary" onClick={onTransform}>
          {buttonLabel}
        </Button>
      </S.BottomSheetButtonContainer>
    </S.BottomSheetLayout>
  );
};

export default TransformBottomSheet;
