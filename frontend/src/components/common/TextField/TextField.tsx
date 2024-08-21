import React, { PropsWithChildren } from "react";

import Text from "../Text/Text";
import * as S from "./TextField.styled";

interface TextFieldProps {
  title: string;
  subTitle?: string;
  isRequired?: boolean;
  children: ((id: string) => React.ReactNode) | React.ReactNode;
}

const REQUIRED_SYMBOL = "*";

const TextField = ({
  title,
  subTitle,
  isRequired = false,
  children,
}: PropsWithChildren<TextFieldProps>) => {
  const id = React.useId();

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
            <Text
              textType="bodyBold"
              css={css`
                color: red;
              `}
            >
              {REQUIRED_SYMBOL}
            </Text>
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
