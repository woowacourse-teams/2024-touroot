import { Header } from "@components/common";

import { BackIcon } from "@assets/svg";
import { Tturi } from "@assets/webp";

import * as S from "./Login.styled";

const Login = () => {
  const LOGIN_TEXT = "로그인";
  const TTURI = "뚜리";
  const GREETING_MAIN_TEXT = "투룻에 온 걸 환영해요!";
  const GREETING_SUB_TEXT = "To your route, touroot!";

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
    </>
  );
};

export default Login;
