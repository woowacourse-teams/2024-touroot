import { Text } from "@components/common";

import { Tturi } from "@assets/svg";

import * as S from "./SearchFallback.styled";

interface SearchFallbackProps {
  title: string;
  text?: string;
}

const SearchFallback = ({ title, text }: SearchFallbackProps) => {
  return (
    <S.Layout>
      <Tturi />
      <S.TextContainer>
        <Text textType="title">{title}</Text>
        <Text textType="body">{text}</Text>
      </S.TextContainer>
    </S.Layout>
  );
};

export default SearchFallback;
