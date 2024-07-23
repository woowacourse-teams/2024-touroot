import { Tturi } from "@assets/svg";

import * as S from "./Content.styled";

interface ContentProps {
  mainText: string;
  subText: string;
}

const Content = ({ mainText, subText }: ContentProps) => {
  return (
    <S.Content>
      <Tturi />
      <S.TextContainer>
        <S.MainText>{mainText}</S.MainText>
        <S.SubText>{subText}</S.SubText>
      </S.TextContainer>
    </S.Content>
  );
};

export default Content;
