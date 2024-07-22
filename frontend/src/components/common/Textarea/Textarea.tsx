import { TextareaHTMLAttributes } from "react";

import Count from "../Count/Count";
import * as S from "./Textarea.styled";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  count: number;
  maxCount: number;
}

const Textarea = ({ count, maxCount, ...props }: TextareaProps) => {
  return (
    <S.TextareaContainer>
      <S.Textarea {...props} />
      <Count count={count} maxCount={maxCount} />
    </S.TextareaContainer>
  );
};

export default Textarea;
