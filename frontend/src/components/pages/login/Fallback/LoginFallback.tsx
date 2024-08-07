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
        <S.MainText>{mainText}</S.MainText>
        {subText && <S.SubText>{subText}</S.SubText>}
      </S.TextContainer>
    </S.Layout>
  );
};

export default LoginFallback;
