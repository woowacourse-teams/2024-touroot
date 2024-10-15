import { useEffect } from "react";

import { Text } from "@components/common";

import { ExcitedTturi } from "@assets/gif";
import { KakaoSymbol } from "@assets/svg";

import * as S from "./LoginPage.styled";
import { GREETING_MAIN_TEXT, GREETING_SUB_TEXT, KAKAO_LABEL, TTURI } from "./contants";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const kakao = window.Kakao;

const LoginPage = () => {

  useEffect(() => {
    if (!kakao?.isInitialized()) {
      kakao?.init(process.env.JAVASCRIPT_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REDIRECT_URI,
    });
  };

  return (
    <>
      <S.GreetingContainer>
        <S.TturiImg src={ExcitedTturi} alt={TTURI} />
        <S.GreetingTextContainer>
          <Text textType="title">{GREETING_MAIN_TEXT}</Text>
          <Text textType="bodyBold" css={S.greetingSubTextStyle}>
            {GREETING_SUB_TEXT}
          </Text>
        </S.GreetingTextContainer>
      </S.GreetingContainer>
      <S.LoginButtonWrapper>
        <S.LoginButton onClick={handleKakaoLogin}>
          <KakaoSymbol />
          <S.LoginLabel>{KAKAO_LABEL}</S.LoginLabel>
        </S.LoginButton>
      </S.LoginButtonWrapper>
    </>
  );
};

export default LoginPage;
