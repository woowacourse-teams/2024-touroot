import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usePostKakaoLogin from "@queries/usePostKakaoLogin";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import LoginFallback from "./Fallback/LoginFallback";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();

  const { mutate: mutateKakaoLogin, isPaused } = usePostKakaoLogin();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const redirectUri = `${window.location.origin}/oauth`;
    const encodedRedirectUri = encodeURIComponent(redirectUri);

    if (code) {
      mutateKakaoLogin({ code, encodedRedirectUri });
    } else {
      alert(ERROR_MESSAGE_MAP.loginFailed);
      navigate(ROUTE_PATHS_MAP.login);
    }
  }, [navigate]);

  if (isPaused) alert(ERROR_MESSAGE_MAP.network);

  return <LoginFallback mainText="로그인 처리 중입니다" subText="잠시만 기다려주세요" />;
};

export default KakaoCallbackPage;
