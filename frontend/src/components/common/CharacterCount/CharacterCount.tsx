import * as S from "./CharacterCount.styled";

interface CharacterCountProps {
  count?: number;
  maxCount?: number;
}

const CharacterCount = ({ count, maxCount }: CharacterCountProps) => {
  return (
    <S.CharacterCountWrapper>
      {count && maxCount ? <S.CharacterCount>{`${count}/${maxCount}`}</S.CharacterCount> : null}
    </S.CharacterCountWrapper>
  );
};

export default CharacterCount;
