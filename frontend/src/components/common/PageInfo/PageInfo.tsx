import { css } from "@emotion/react";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import Text from "../Text/Text";
import * as S from "./PageInfo.styled";
import { PageInfoProps } from "./PageInfo.type";

const PageInfo = ({ mainText, subText }: PageInfoProps) => {
  return (
    <S.PageInfo>
      <Text textType="title">{mainText}</Text>
      <Text
        textType="detail"
        css={css`
          color: ${PRIMITIVE_COLORS.gray[700]};
        `}
      >
        {subText}
      </Text>
    </S.PageInfo>
  );
};

export default PageInfo;
