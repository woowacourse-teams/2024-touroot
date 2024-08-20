import React, { PropsWithChildren, ReactElement, cloneElement } from "react";

import { css } from "@emotion/react";

import Text from "../Text/Text";
import * as S from "./TextField.styled";

interface TextFieldProps {
  title: string;
  subTitle?: string;
  isRequired?: boolean;
}

const REQUIRED_SYMBOL = "*";

const TextField = ({
  title,
  subTitle,
  isRequired = false,
  children,
}: PropsWithChildren<TextFieldProps>) => {
  const id = React.useId();
  const child = children as ReactElement;
  const childWithId = cloneElement(child, { id });

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
      {childWithId}
    </S.Layout>
  );
};

export default TextField;
