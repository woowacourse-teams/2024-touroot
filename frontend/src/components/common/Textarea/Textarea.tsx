import { TextareaHTMLAttributes } from "react";

import CharacterCount from "../CharacterCount/CharacterCount";
import * as S from "./Textarea.styled";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  count: number;
  maxCount: number;
}

const Textarea = ({ count, maxCount, ...props }: TextareaProps) => {
  return (
    <S.TextareaContainer>
      <S.Textarea {...props} />
      <CharacterCount count={count} maxCount={maxCount} />
    </S.TextareaContainer>
  );
};

export default Textarea;
