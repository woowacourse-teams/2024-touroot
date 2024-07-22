import * as S from "./Count.styled";

interface CountProps {
  count: number;
  maxCount: number;
}

const Count = ({ count, maxCount }: CountProps) => {
  return (
    <S.CountWrapper>
      <S.Count>{`${count}/${maxCount}`}</S.Count>
    </S.CountWrapper>
  );
};

export default Count;
