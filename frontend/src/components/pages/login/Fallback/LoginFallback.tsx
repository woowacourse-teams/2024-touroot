import { Text } from "@components/common";
import Spinner from "@components/common/Spinner/Spinner";

import * as S from "./LoginFallback.styled";

interface LoginFallbackProps {
  mainText: string;
  subText?: string;
}

const LoginFallback = ({ mainText, subText }: LoginFallbackProps) => {
  return (
    <S.Layout>
      <Spinner />
      <S.TextContainer>
        <Text textType="title">{mainText}</Text>
        {subText && (
          <Text textType="bodyBold" css={S.subTextStyle}>
            {subText}
          </Text>
        )}
      </S.TextContainer>
    </S.Layout>
  );
};

export default LoginFallback;
