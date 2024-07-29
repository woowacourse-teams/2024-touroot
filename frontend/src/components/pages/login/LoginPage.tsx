import { useEffect } from "react";

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
        <S.GreetingBox>
          <S.GreetingMainText>{GREETING_MAIN_TEXT}</S.GreetingMainText>
          <S.GreetingSubText>{GREETING_SUB_TEXT}</S.GreetingSubText>
        </S.GreetingBox>
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
