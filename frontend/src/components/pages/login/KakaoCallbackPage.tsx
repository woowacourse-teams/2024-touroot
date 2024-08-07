import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SaveUserContext } from "@contexts/UserProvider";

import { client } from "@apis/client";

import { API_ENDPOINT_MAP } from "@constants/endpoint";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

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
        .then((res) => {
          saveUser({ accessToken: res.data.accessToken });
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

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
