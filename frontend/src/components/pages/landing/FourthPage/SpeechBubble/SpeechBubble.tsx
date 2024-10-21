import { Text } from "@components/common";

import { SpeechBubbleLeft, SpeechBubbleRight } from "@assets/webp";

import * as S from "./SpeechBubble.styled";

export interface SpeechBubbleProps {
  variants: "left" | "right";
  name: string;
}

const SpeechBubble = ({ variants, name, children }: React.PropsWithChildren<SpeechBubbleProps>) => {
  return (
    <S.Layout>
      <S.NameWrapper $variants={variants}>
        <Text css={S.fontWeightMediumStyle}>{name}</Text>
      </S.NameWrapper>
      <S.TextWrapper $variants={variants}>{children}</S.TextWrapper>
      <S.Image src={variants === "left" ? SpeechBubbleLeft : SpeechBubbleRight} />
    </S.Layout>
  );
};

export default SpeechBubble;
