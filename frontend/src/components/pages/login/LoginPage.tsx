import { Header } from "@components/common";

import { BackIcon, KakaoSymbol } from "@assets/svg";
import { Tturi } from "@assets/webp";

import * as S from "./LoginPage.styled";

const LoginPage = () => {
  const LOGIN_TEXT = "로그인";
  const TTURI = "뚜리";
  const GREETING_MAIN_TEXT = "투룻에 온 걸 환영해요!";
  const GREETING_SUB_TEXT = "To your route, touroot!";
  const KAKAO_LABEL = "카카오 로그인";

  return (
    <>
      <Header>
        <BackIcon />
        <S.LoginText>{LOGIN_TEXT}</S.LoginText>
        <S.HiddenDiv />
      </Header>
      <S.GreetingContainer>
        <S.TturiImg src={Tturi} alt={TTURI} />
        <S.GreetingBox>
          <S.GreetingMainText>{GREETING_MAIN_TEXT}</S.GreetingMainText>
          <S.GreetingSubText>{GREETING_SUB_TEXT}</S.GreetingSubText>
        </S.GreetingBox>
      </S.GreetingContainer>
      <S.LoginButtonWrapper>
        <S.LoginButton>
          <KakaoSymbol />
          <S.LoginLabel>{KAKAO_LABEL}</S.LoginLabel>
        </S.LoginButton>
      </S.LoginButtonWrapper>
    </>
  );
};

export default LoginPage;
