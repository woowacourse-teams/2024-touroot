import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SaveUserContext } from "@contexts/UserProvider";

import { client } from "@apis/client";

import { ROUTE_PATHS } from "@constants/route";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(SaveUserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      client
        .post(`${ROUTE_PATHS.loginOauth}?code=${code}`)
        .then((res) => {
          saveUser(res.data);
          navigate(ROUTE_PATHS.root);
        })
        .catch((e) => {
          console.error(e);
          navigate(ROUTE_PATHS.login);
        });
    } else {
      navigate(ROUTE_PATHS.login);
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
