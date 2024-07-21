import { useEffect } from "react";

// import { AxiosResponse } from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { client } from "@apis/client";
import { KakaoSymbol } from "@assets/svg";
import { Tturi } from "@assets/webp";

import * as S from "./LoginPage.styled";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
// interface KakaoLoginResult {
//   accessToken: "string";
// }

const kakao = window.Kakao;

const LoginPage = () => {
  const TTURI = "뚜리";
  const GREETING_MAIN_TEXT = "투룻에 온 걸 환영해요!";
  const GREETING_SUB_TEXT = "To your route, touroot!";
  const KAKAO_LABEL = "카카오 로그인";

  const handleClickLoginButton = () => {
    kakao?.Auth?.authorize({
      redirectUri: process.env.REDIRECT_URI,
    });

    // TODO: 백엔드 api 명세서에 따라 수정 예정
    // const { data } = useQuery<AxiosResponse<KakaoLoginResult>>({
    //   queryKey: ["login"],
    //   queryFn: () => client.get("/api/v1/login/oauth/kakao"),
    // });
  };

  useEffect(() => {
    if (!kakao?.isInitialized()) {
      kakao?.init(process.env.JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <>
      <S.GreetingContainer>
        <S.TturiImg src={Tturi} alt={TTURI} />
        <S.GreetingBox>
          <S.GreetingMainText>{GREETING_MAIN_TEXT}</S.GreetingMainText>
          <S.GreetingSubText>{GREETING_SUB_TEXT}</S.GreetingSubText>
        </S.GreetingBox>
      </S.GreetingContainer>
      <S.LoginButtonWrapper>
        <S.LoginButton onClick={handleClickLoginButton}>
          <KakaoSymbol />
          <S.LoginLabel>{KAKAO_LABEL}</S.LoginLabel>
        </S.LoginButton>
      </S.LoginButtonWrapper>
    </>
  );
};

export default LoginPage;
