import { Tturi } from "@assets/svg";

import * as S from "./ModalContent.styled";

interface ModalContentProps {
  mainText: string;
  subText: string;
}

const ModalContent = ({ mainText, subText }: ModalContentProps) => {
  return (
    <S.ModalContent>
      <Tturi />
      <S.TextContainer>
        <S.MainText>{mainText}</S.MainText>
        <S.SubText>{subText}</S.SubText>
      </S.TextContainer>
    </S.ModalContent>
  );
};

export default ModalContent;
