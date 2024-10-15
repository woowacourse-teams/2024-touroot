import { useEffect, useRef } from "react";

import { Text } from "@components/common";

import { ExcitedTturi } from "@assets/gif";
import { KakaoSymbol } from "@assets/svg";

import * as S from "./LoginPage.styled";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const kakao = window.Kakao;

const LoginPage = () => {
  const TTURI = "뚜리";
  const GREETING_MAIN_TEXT = "투룻에 온 걸 환영해요!";
  const GREETING_SUB_TEXT = "To your route, touroot!";
  const KAKAO_LABEL = "카카오 로그인";

  const loginButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!kakao?.isInitialized()) {
      kakao?.init(process.env.JAVASCRIPT_KEY);
    }

    loginButtonRef.current && loginButtonRef.current.focus();
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
        <S.LoginButton onClick={handleKakaoLogin} ref={loginButtonRef} aria-label="카카오 로그인">
          <KakaoSymbol />
          <S.LoginLabel>{KAKAO_LABEL}</S.LoginLabel>
        </S.LoginButton>
      </S.LoginButtonWrapper>
    </>
  );
};

export default LoginPage;
