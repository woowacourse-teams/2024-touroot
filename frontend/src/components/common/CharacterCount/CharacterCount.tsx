import * as S from "./CharacterCount.styled";

interface CharacterCountProps {
  count: number;
  maxCount: number;
}

const CharacterCount = ({ count, maxCount }: CharacterCountProps) => {
  return (
    <S.CharacterCountWrapper>
      <S.CharacterCount>{`${count}/${maxCount}`}</S.CharacterCount>
    </S.CharacterCountWrapper>
  );
};

export default CharacterCount;
