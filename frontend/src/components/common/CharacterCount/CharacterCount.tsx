import React from "react";

import * as S from "./CharacterCount.styled";

interface CharacterCountProps extends React.ComponentPropsWithoutRef<"div"> {
  count?: number;
  maxCount?: number;
}

const CharacterCount = ({ count, maxCount, ...props }: CharacterCountProps) => {
  return (
    <S.CharacterCountWrapper {...props}>
      {count && maxCount ? <S.CharacterCount>{`${count}/${maxCount}`}</S.CharacterCount> : null}
    </S.CharacterCountWrapper>
  );
};

export default CharacterCount;
