import { PropsWithChildren } from "react";

import { Button, Text } from "@components/common";

import * as S from "./TransformFooter.styled";

interface TransformFooter {
  buttonLabel: string;
  guideMessage: string;
  onTransform?: () => void;
}

const TransformFooter = ({
  children,
  guideMessage,
  buttonLabel,
  onTransform,
}: PropsWithChildren<TransformFooter>) => {
  return (
    <S.Layout>
      <Text textType="detailBold">{guideMessage}</Text>
      <S.ButtonContainer>
        {children}
        <Button variants="primary" onClick={onTransform}>
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default TransformFooter;
