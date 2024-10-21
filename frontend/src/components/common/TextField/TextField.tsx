import { useId } from "react";

import Text from "../Text/Text";
import * as S from "./TextField.styled";

interface TextFieldProps {
  title: string;
  subTitle?: string;
  isRequired?: boolean;
  children: React.ReactNode | ((id: string) => React.ReactNode);
}

const REQUIRED_SYMBOL = "*";

const TextField = ({ title, subTitle, isRequired = false, children }: TextFieldProps) => {
  const id = useId();

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(id);
    }
    return children;
  };

  return (
    <S.Layout>
      <S.LabelContainer htmlFor={id}>
        <S.TextContainer>
          <Text textType="bodyBold">{title}</Text>
          {isRequired && (
            <>
              <Text textType="bodyBold" css={S.symbolStyle} aria-hidden="true">
                {REQUIRED_SYMBOL}
              </Text>
              <span css={S.visualHiddenStyle}>필수 항목입니다</span>
            </>
          )}
        </S.TextContainer>
        {subTitle && (
          <Text textType="detail" css={S.SubtitleStyle}>
            {subTitle}
          </Text>
        )}
      </S.LabelContainer>
      {renderChildren()}
    </S.Layout>
  );
};

export default TextField;
