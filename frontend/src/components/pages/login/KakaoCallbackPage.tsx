import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosResponse } from "axios";

import { AuthTokenResponse } from "@type/domain/user";

import { client } from "@apis/client";

import { SaveUserContext } from "@contexts/UserProvider";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import LoginFallback from "./Fallback/LoginFallback";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(SaveUserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const redirectUri = `${window.location.origin}/oauth`;
    const encodedRedirectUri = encodeURIComponent(redirectUri);

    if (code) {
      client
        .post(API_ENDPOINT_MAP.loginOauth(code, encodedRedirectUri))
        .then((res: AxiosResponse<AuthTokenResponse>) => {
          saveUser({
            accessToken: res.data.accessToken,
            memberId: res.data.memberId,
            refreshToken: res.data.refreshToken,
          });
          navigate(ROUTE_PATHS_MAP.root);
        })
        .catch(() => {
          alert(ERROR_MESSAGE_MAP.loginFailed);
          navigate(ROUTE_PATHS_MAP.login);
        });
    } else {
      alert(ERROR_MESSAGE_MAP.loginFailed);
      navigate(ROUTE_PATHS_MAP.login);
    }
  }, [navigate]);

  return <LoginFallback mainText="로그인 처리 중입니다" subText="잠시만 기다려주세요" />;
};

export default KakaoCallbackPage;
